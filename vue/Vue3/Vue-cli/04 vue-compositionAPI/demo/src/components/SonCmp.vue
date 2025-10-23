<template>
    <div>
        <h3>this is aboutPage's SonCmp</h3>
        <slot name="firstSlot">
            SonCmp's default slot
        </slot>
    </div>
</template>

<script>
export default {
    name: 'SonCmp',
    props: {
        num: {
            type: Number,
            default: 0
        }
    },
    setup(p, c) {
        console.log('SonCmp\'s Setup start     --------');
        console.log('props: \n', p);
        console.log('context: \n', c);

        // 没有使用props接收的变量会被传入attrs中
        console.log(c.attrs.NotInProps);

        // 查看传入的插槽
        console.log(c.slots);

        // context.emit可以向父组件提交事件, 子传父
        // c.emit('event', payload)



        console.log('SonCmp\'s Setup end       --------');
    },
}
</script>