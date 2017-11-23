// 各地区图标页配置信息
let allConfig = [
    {
        pinyin: 'zongbu',
        name: '总部',
        code: '100000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '绑定企业',
                            url: '/bind?',
                            bgImg: require('src/assets/images/icon/icon_31.png'),
                        },
                        {
                            label: '培训报名',
                            url: '/train?',
                            bgImg: require('src/assets/images/icon/icon_17.png'),
                        },
                        {
                            label: '总体介绍',
                            url: '/newsContent?categorycode=001109012020001',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '如何办理实名制',
                            url: '/newsContent?categorycode=001109012020002',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '手册指南',
                            url: '/inforpractice?categorycode=001109012020003',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '常见问题',
                            url: '/newsContent?categorycode=001109012020004',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                    ],
                },
                {
                    titleName: '财税咨询',
                    icons: [
                        {
                            label: '资讯动态',
                            url: '/jcinformation',
                            bgImg: require('src/assets/images/icon/icon_29.png'),
                        },
                        {
                            label: '我的社区',
                            url: 'http://www.4009912366.com/',
                            bgImg: require('src/assets/images/icon/icon_30.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        // 区域信息
        pinyin: 'guangdong',
        name: '广东',
        code: '440000',
        // CA
        ca: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '国税CA',
                    icons: [
                        {
                            label: '网点查询',
                            url: '/gd_ca_net',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '如何办理',
                            url: '/newsContent?categorycode=001109012010010001',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
                {
                    titleName: '地税  CA',
                    icons: [
                        {
                            label: '如何办理',
                            url: '/newsContent?categorycode=001109012010010002',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '办理进度',
                            url: '/dealPace',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '税通号码',
                            url: '/mysthm',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '办理进度',
                            url: '/dealPace',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '税通号码',
                            url: '/mysthm',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                    ],
                },
            ],
        },
        // 培训服务
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        // {
                        //     label: '培训签到',
                        //     url: '',
                        //     wechatCode: 'JCHL_GD',
                        //     bgImg: require('src/assets/images/icon/icon_22.png'),
                        // },
                        {
                            label: '培训资料',
                            url: '/inforpractice?categorycode=001109012010009001&pageindex=1&encode=440000',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                    ],
                },
            ],
        },
        // 电子税务局
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '总体介绍',
                            url: '/newsContent?categorycode=001109012010001001',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '如何办理实名制',
                            url: '/newsContent?categorycode=001109012010001002',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '手册指南',
                            url: '/inforpractice?categorycode=001109012010001003',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '常见问题',
                            url: '/newsContent?categorycode=001109012010001004',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                        {
                            label: '涉税查询',
                            url: '/inforpractice?categorycode=001109012010001005',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'shenzhen',
        name: '深圳',
        code: '440300',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_SZ',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'chongqing',
        name: '重庆',
        code: '500000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '总体介绍',
                            url: '/newsContent?categorycode=001109012017003001',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '常见问题',
                            url: '/newsContent?categorycode=001109012017003002',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_CQ',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'guizhou',
        name: '贵州',
        code: '520000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_GZ',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '培训资料',
                            url: '/inforpractice?categorycode=001109012019003001&pageindex=1&encode=520000',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'hebei',
        name: '河北',
        code: '130000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '地税常见问题',
                            url: '/newsContent?categorycode=001109012011013005',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                        {
                            label: '国税常见问题',
                            url: '/newsContent?categorycode=001109012011013004',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                        {
                            label: '地税总体介绍',
                            url: '/newsContent?categorycode=001109012011013003',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '国税总体介绍',
                            url: '/newsContent?categorycode=001109012011013002',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '手册指南',
                            url: '/inforpractice?categorycode=001109012011013001',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_HB',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'hunan',
        name: '湖南',
        code: '430000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url:
                            'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url:
                            'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url:
                            'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url:
                            'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url:
                            'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_HN',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'qingdao',
        name: '青岛',
        code: '370200',
        etax: {
            headerName: '办税专区',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ],
        },
        dzswj: {
            headerName: '办税专区',
            iconData: [
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '地税常见\n问题',
                            url: '/newsContent?categorycode=001109015001001001',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                        {
                            label: '地税总体\n介绍',
                            url: '/newsContent?categorycode=001109015001001002',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_HB',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
        zixun: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '资讯',
                    icons: [
                        {
                            label: '热点资讯',
                            url: '/#/inforpractice?categorycode=001109015001002&pageindex=1',
                            bgImg: require('src/assets/images/icon/icon_29.png')
                        },
                        {
                            label: '政策法规',
                            url: 'http://www.tax12366.org/Taxlaws/Index?fromid=gh_f8c4fb78c778&from=singlemessage',
                            bgImg: require('src/assets/images/icon/icon_07.png')
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'qinghai',
        name: '青海',
        code: '630000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '总体介绍',
                            url: '/newsContent?categorycode=001109012016005004',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '如何办理实名制',
                            url: '/newsContent?categorycode=001109012016005003',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '手册指南',
                            url: '/inforpractice?categorycode=001109012016005002',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '常见问题',
                            url: '/newsContent?categorycode=001109012016005001',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_QH',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'shandong',
        name: '山东',
        code: '370000',
        etax: {
            headerName: '财税业务',
            iconData: [
                {
                    titleName: '各地市办税',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ]
        },
        dzswj: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '地税常见<br>问题',
                            url: '/inforpractice?categorycode=001109012013003001',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                        {
                            label: '地税总体<br>介绍',
                            url: '/newsContent?categorycode=001109012013003002',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_SD',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
        zixun: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '资讯',
                    icons: [
                        {
                            label: '热点资讯',
                            url: '/inforpractice?categorycode=001109012013004&pageindex=1',
                            bgImg: require('src/assets/images/icon/icon_29.png')
                        },
                        {
                            label: '政策法规',
                            url: 'http://www.tax12366.org/Taxlaws/Index?fromid=gh_f8c4fb78c778&from=singlemessage',
                            bgImg: require('src/assets/images/icon/icon_07.png')
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'sichuan',
        name: '四川',
        code: '510000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_SC',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'yunnan',
        name: '云南',
        code: '530000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '财税业务',
                    icons: [
                        {
                            label: '纳税服务',
                            url: '/taxBusiness?funType=纳税服务',
                            bgImg: require('src/assets/images/icon/icon_03.png'),
                        },
                        {
                            label: '个人办税',
                            url: '/taxBusiness?funType=个人办税',
                            bgImg: require('src/assets/images/icon/icon_05.png'),
                        },
                        {
                            label: '涉税事项',
                            url: '/taxBusiness?funType=涉税事项',
                            bgImg: require('src/assets/images/icon/icon_07.png'),
                        },
                        {
                            label: '申报缴款',
                            url: '/taxBusiness?funType=申报缴款',
                            bgImg: require('src/assets/images/icon/icon_12.png'),
                        },
                        {
                            label: '发票中心',
                            url: '/taxBusiness?funType=发票中心',
                            bgImg: require('src/assets/images/icon/icon_13.png'),
                        },
                    ],
                },
                {
                    titleName: '电子税务局',
                    icons: [
                        {
                            label: '总体介绍',
                            url: '/newsContent?categorycode=001109012015005003',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '如何办理实名制',
                            url: '/newsContent?categorycode=001109012015005004',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '手册指南',
                            url: '/inforpractice?categorycode=001109012015005002',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                        {
                            label: '常见问题',
                            url: '/newsContent?categorycode=001109012015005001',
                            bgImg: require('src/assets/images/icon/icon_24.png'),
                        },
                    ],
                },
            ],
        },
        pxfw: {
            headerName: '服务',
            iconData: [
                {
                    titleName: '培训服务',
                    icons: [
                        {
                            label: '培训报名',
                            url: '/train',
                            bgImg: require('src/assets/images/icon/icon_18.png'),
                        },
                        {
                            label: '培训签到',
                            url: '',
                            wechatCode: 'JCHL_YN',
                            bgImg: require('src/assets/images/icon/icon_22.png'),
                        },
                        {
                            label: '培训资料',
                            url: '/inforpractice?categorycode=001109012015008001&pageindex=1&encode=530000',
                            bgImg: require('src/assets/images/icon/icon_16.png'),
                        },
                    ],
                },
            ],
        },
    },
    {
        pinyin: 'shaanxi', //区别山西shanxi
        name: '陕西',
        code: '610000',
        etax: {
            headerName: '办税大厅',
            iconData: [
                {
                    titleName: '电子税务局',
                    icons: [],
                },
            ],
        },
    },
]
// 过滤名单
let filterList = ['总部', '青海', '云南', '河北', '陕西']
let filteredData = allConfig.filter(item => filterList.indexOf(item.name) < 0)
// 输出过滤后的数据
export default filteredData
