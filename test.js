<template>

  <div
    contenteditable="true"
    class="rich-container"
    ref="richRef"
    @keydown="handleKeydown"
    @input="handleInput"
  ></div>
</template>

<script>
export default {
  name: 'RichInputEditor',
  data() {
    return {
      scopeAttr: null, // Vue组件的作用域CSS属性
      placeholders: new Map(), // 存储占位符元素和相关信息
      observer: null, // DOM变化观察器
      isProcessing: false, // 处理状态标志，防止递归处理
      currentState: {
        html: '', // 当前HTML内容
        selection: null // 当前选中文本信息
      },
      isProgrammaticUpdate: false // 程序更新标志，防止触发输入事件
    }
  },
  methods: {
    // 刷新编辑器，重置所有状态
    refresh() {
      this.clearPlaceholders()
      this.resetEditor()
      this.resetObserver()
      this.resetState()
    },

    // 重置编辑器内容
    resetEditor() {
      const el = this.$refs.richRef
      el.innerHTML = ''
      this.setText('')
    },

    // 重置DOM观察器
    resetObserver() {
      this.observer?.disconnect()
      this.initObserver()
    },

    // 初始化DOM变化观察器
    initObserver() {
      const el = this.$refs.richRef
      this.observer = new MutationObserver(mutations => {
        // 防止处理过程中再次触发
        if (this.isProcessing || this.isProgrammaticUpdate) return

        this.isProcessing = true
        const processedIds = new Set()

        mutations.forEach(mutation => {
          // 处理子节点变化
          if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(node => {
              // 当b标签被删除时，创建占位符
              if (node.tagName === 'B') {
                const originalText = node.dataset.originalText
                const id = node.dataset.id
                if (originalText && id && !processedIds.has(id)) {
                  this.createPlaceholder(originalText, id)
                  processedIds.add(id)
                }
              }
            })
          }

          // 处理文本内容变化
          if (
            mutation.type === 'characterData' &&
            mutation.target.parentNode?.tagName === 'B'
          ) {
            const bTag = mutation.target.parentNode
            const originalText = bTag.dataset.originalText
            const id = bTag.dataset.id
            // 当b标签内容被清空时，删除标签并创建占位符
            if (
              mutation.target.textContent.trim() === '' &&
              originalText &&
              id &&
              !processedIds.has(id)
            ) {
              bTag.remove()
              this.createPlaceholder(originalText, id)
              processedIds.add(id)
            }
          }
        })

        this.$nextTick(() => {
          this.isProcessing = false
        })
      })

      // 监听子节点、子树和文本内容变化
      this.observer.observe(el, {
        childList: true,
        subtree: true,
        characterData: true
      })
    },

    // 重置编辑器状态
    resetState() {
      this.currentState = {
        html: '',
        selection: null
      }
      this.placeholders.clear()
    },

    // 处理键盘按下事件
    handleKeydown(e) {
      this.$emit('keydown', e)
    },

    // 处理输入事件
    handleInput() {
      if (this.isProgrammaticUpdate) return

      const el = this.$refs.richRef
      const html = el.innerHTML

      this.clearPlaceholders()
      this.restorePlaceholderToPrompt(html)

      this.$nextTick(() => {
        this.replaceText(html)
        this.$emit('text-change', this.getText())
      })
    },

    // 将占位符恢复为提示文本
    restorePlaceholderToPrompt(html) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const currentBTags = doc.body.querySelectorAll('b')

      const currentBTagIds = new Set()
      currentBTags.forEach(b => {
        const id = b.dataset.id
        if (id) currentBTagIds.add(id)
      })

      // 复制当前占位符列表进行处理
      const placeholdersCopy = Array.from(this.placeholders.entries())

      // 移除已恢复的占位符
      placeholdersCopy.forEach(([placeholderEl, { deletedText, uniqueId }]) => {
        if (currentBTagIds.has(uniqueId)) {
          placeholderEl.remove()
          this.placeholders.delete(placeholderEl)
        }
      })
    },

    // 保存当前选中文本信息
    saveSelection(containerEl) {
      const selection = window.getSelection()
      if (selection.rangeCount === 0) return { start: 0, end: 0 }

      const range = selection.getRangeAt(0)
      const preSelectionRange = range.cloneRange()
      preSelectionRange.selectNodeContents(containerEl)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)
      const start = preSelectionRange.toString().length
      return {
        start,
        end: start + range.toString().length
      }
    },

    // 恢复之前保存的选中文本
    restoreSelection(containerEl, savedSel) {
      if (!savedSel) return
      const charIndex = { count: 0 }
      const range = document.createRange()
      range.setStart(containerEl, 0)
      range.collapse(true)

      // 递归遍历节点查找选中文本位置
      const traverseNodes = function(node) {
        if (node.nodeType === 3) {
          const nextCount = charIndex.count + node.length
          if (charIndex.count <= savedSel.start && nextCount >= savedSel.start) {
            range.setStart(node, savedSel.start - charIndex.count)
          }
          if (charIndex.count <= savedSel.end && nextCount >= savedSel.end) {
            range.setEnd(node, savedSel.end - charIndex.count)
          }
          charIndex.count = nextCount
        } else {
          node.childNodes.forEach(child => traverseNodes(child))
        }
      }

      traverseNodes(containerEl)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    },

    // 替换文本中的变量占位符为特殊格式
    replaceText(text) {
      const regex = /\$\{([^}]+)\}/g
      if (regex.test(text)) {
        const el = this.$refs.richRef
        let savedSel
        // 保存当前选中文本
        if (window.getSelection().rangeCount > 0) {
          savedSel = this.saveSelection(el)
        } else {
          savedSel = {
            start: el.textContent.length,
            end: el.textContent.length
          }
        }

        this.clearPlaceholders()
        // 将${variable}格式替换为特殊b标签
        el.innerHTML = text.replace(
          /\$\{([^}]+)\}/g,
          (match, p1) => {
            const id = Math.random().toString(36).substr(2, 9)
            return `<b ${this.scopeAttr} data-original-text="${p1}" data-id="${id}">${p1}</b>`
          }
        )

        // 恢复选中文本或移动光标到末尾
        if (!window.getSelection().rangeCount > 0) {
          this.moveCaretToEnd(el)
        } else {
          this.restoreSelection(el, savedSel)
        }

        return
      }
    },

    // 将光标移动到元素末尾
    moveCaretToEnd(el) {
      if (!el) return

      const range = document.createRange()
      const selection = window.getSelection()

      range.selectNodeContents(el)
      range.collapse(false)

      selection.removeAllRanges()
      selection.addRange(range)

      el.focus()
    },

    // 设置编辑器文本内容
    setText(text) {
      this.isProgrammaticUpdate = true

      const el = this.$refs.richRef
      this.replaceText(text)
      this.$nextTick(() => {
        this.moveCaretToEnd(el)
      })

      setTimeout(() => {
        this.isProgrammaticUpdate = false
      }, 0)
    },

    // 清理HTML，只保留b标签
    cleanHtmlKeepingBoldTags(htmlString) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')
      doc.body.querySelectorAll('*').forEach(function(el) {
        if (el.tagName.toLowerCase() !== 'b') {
          el.outerHTML = el.innerHTML
        }
      })
      return doc.body.innerHTML
    },

    // 获取编辑器文本内容
    getText(format = false) {
      if (!format) return this.$refs.richRef.textContent
      const htmlString = this.cleanHtmlKeepingBoldTags(this.$refs.richRef.innerHTML)
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlString
      // 移除占位符元素
      tempDiv.querySelectorAll('.placeholder-shade').forEach(function(ph) {
        ph.remove()
      })
      // 将b标签替换为{variable}格式
      tempDiv.querySelectorAll('b').forEach(function(b) {
        const textNode = document.createTextNode('{'.concat(b.textContent, '}'))
        b.parentNode.replaceChild(textNode, b)
      })
      return tempDiv.innerHTML
    },

    // 创建提示占位符
    createPlaceholder(deletedText, uniqueId = null) {
      const el = this.$refs.richRef
      const placeholder = document.createElement('span')
      placeholder.className = 'placeholder-shade'
      placeholder.textContent = '请输入 ' + deletedText
      placeholder.dataset.deletedText = deletedText
      placeholder.dataset.uniqueId = uniqueId

      const selection = window.getSelection()
      const range = document.createRange()

      // 在当前光标位置插入占位符
      if (selection.rangeCount > 0) {
        range.setStart(selection.getRangeAt(0).startContainer, selection.getRangeAt(0).startOffset)
      } else {
        range.selectNodeContents(el)
        range.collapse(false)
      }
      range.insertNode(placeholder)
      this.placeholders.set(placeholder, { deletedText, uniqueId })
    },

    // 清除所有占位符
    clearPlaceholders() {
      this.placeholders.forEach((_, ph) => {
        if (ph && ph.parentNode) {
          ph.remove()
        }
      })
      this.placeholders.clear()
    }
  },
  mounted() {
    const el = this.$refs.richRef
    const attrs = Array.from(el.attributes)
    this.scopeAttr = attrs.find(attr => attr.name.startsWith('data-v-'))?.name
    this.initObserver()
  },
  beforeDestroy() {
    const el = this.$refs.richRef
    this.observer?.disconnect()
    this.clearPlaceholders()
    this.resetState()
  }
}
</script>

<style lang="less" scoped>
.rich-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  outline: none;
  overflow: auto;

  // 空内容时显示占位符
  &:empty::before {
    content: attr(placeholder);
    color: #999;
    display: block;
    opacity: 0.7;
  }

  &:focus::before {
    content: none;
  }

  // 变量标签样式
  b {
    background: #e8f4ff;
    color: #0065fc;
    margin: 0 2px;
    padding: 2px 5px;
    border-radius: 3px;
    display: inline-block;
    word-break: break-word;
    cursor: text;
  }

  // 占位符样式
  ::v-deep .placeholder-shade {
    background: rgba(241, 245, 249, 0.8);
    color: #64748b;
    padding: 2px 6px;
    margin: 0 2px;
    border-radius: 4px;
    display: inline-block;
    font-style: italic;
    opacity: 0.9;
    position: relative;
    transition: all 0.2s ease;

    &::before {
      content: '[';
      margin-right: 2px;
    }

    &::after {
      content: ']';
      margin-left: 2px;
    }

    &:hover {
      background: rgba(226, 232, 240, 0.8);
    }
  }
}

// 自定义选中文本样式
.rich-container ::selection,
.rich-container ::-moz-selection {
  background: transparent;
  color: inherit;
}
</style>