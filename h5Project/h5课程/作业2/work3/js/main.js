const App = Vue.createApp({
    data() {
        return {
            loremOneNow:'click link left',
            loremTwoNow:'click link left',
            loremsOne:[
                'something Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, totam veniam. Omnis aspernatur eius rem doloremque. Quaerat impedit in expedita accusamus repudiandae accusantium pariatur ab corrupti iste, nam, animi voluptate.',
                '我曾经跨过山和大海,也穿过人山人海,我曾经拥有着一切,转眼都飘散如烟,我不过像你像他像那野草野花,绝望着也渴望着也哭也笑平凡着',
                '我曾难自拔于世界之大,也沉溺于其中梦话,不得真假 不做挣扎 不惧笑话,我曾将青春翻涌成她,也曾指尖弹出盛夏 心之所动 且就随缘去吧 晚风吹起你鬓间的白发 抚平回忆留下的疤 你的眼中 明暗交杂 一笑生花 暮色遮住你蹒跚的步伐走进床头藏起的画 画中的你 低着头说话 我仍感叹于世界之大 也沉醉于儿时情话 不剩真假 不做挣扎 无谓笑话 我终将青春还给了她 连同指尖弹出的盛夏 心之所动 就随风去了 以爱之名 你还愿意吗'
             ],
             loremsTwo:[
                 '雨淋湿了天空 毁得很讲究 你说你不懂 为何在这时牵手 我晒干了沉默 悔得很冲动 就算这是做错 也只是怕错过 在一起叫梦 分开了叫痛 是不是说 没有做完的梦最痛',
                 '你的回话凌乱着 在这个时刻 我想起喷泉旁的白鸽 甜蜜散落了 情绪莫名的拉扯 我还爱你呢 而你断断续续唱着歌 假装没事了',
                 '狼牙月 伊人憔悴 我举杯 饮尽了风雪 是谁打翻前世柜 惹尘埃是非 缘字诀 几番轮回 你锁眉 哭红颜唤不回 纵然青史已经成灰 我爱不灭 繁华如三千东流水 我只取一瓢爱了解 只恋你化身的蝶'
             ]
        }

    },

    methods:{
         changeLoremOne:function() {
             this.loremOneNow=this.loremsOne[0]
             this.loremTwoNow=this.loremsTwo[0]
         },
         changeLoremTwo:function() {
             this.loremOneNow=this.loremsOne[1]
             this.loremTwoNow=this.loremsTwo[1]
         },
         changeLoremThree:function() {
             this.loremOneNow=this.loremsOne[2]
             this.loremTwoNow=this.loremsTwo[2]
         }
    }
}).mount("#main")