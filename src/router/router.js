export default [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/index/index'),
    meta: {
      title: '首页',
      header: true,  //显示头部和底部导航
      footer: true,
      color: "#f4f4f4"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录',

    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/cart.vue'),
    meta: {
      title: '购物车',
      header: true,
      footer: true,
      color: "#fff"
    }
  },
  {
    name: 'cateGory',
    path: '/cateGory',
    component: () => import('@/views/cateGory/cateGory'),
    meta: {
      title: "商品分类",
      header: true,
      footer: true,
      color: "#f4f4f4"
    }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search/search'),
    meta: {
      title: "搜索关键字",
      header: true,
      footer: true,
      color: "#f4f4f4"
    }
  },
  {
    name: 'details',
    path: '/details',
    component: () => import('@/views/details/details'),
    meta: {
      title: '商品详情',
      header: true,
      footer: true,
      color: "#fff"
    }
  },
  {
    name: 'article',
    path: '/article',
    component: () => import('@/views/article/article'),
    meta: {
      title: '公告',
      header: true,
      footer: true,
      color: "#fff"
    }
  },
  {
    name: 'success',
    path: '/success',
    component: () => import('@/views/success'),
    meta: {
      title: '订单提交成功',
      header: true,
      footer: true,
      color: "#fff"
    }
  },
  // {
  //   name: 'hot',
  //   path: '/special/hot',
  //   component: () => import('@/views/special/hot/hot'),
  //   meta: {
  //     title: "热卖爆款",
  //     header: true,

  //   },
  // },
  // {
  //   name: 'player',
  //   path: '/special/player',
  //   component: () => import('@/views/special/player/player'),
  //   meta: {
  //     title: "直播",
  //     header: true
  //   },
  // },
  {
    name: 'tabBar',
    path: '/tabBar',
    component: () => import('@/views/tabBar'),
    meta: {
      title: "商品分类",
      header: true,
      footer: true,
      color: "#f4f4f4"
    },
    children: [
      {
        path: 'reverse',
        name: 'reverse',
        component: () => import('@/views/tabBar/order/reverse/reverse'),
        meta: {
          title: "未完成订单",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'presell',
        name: 'presell',
        component: () => import('@/views/tabBar/order/presell/presell'),
        meta: {
          title: "预售订单",
          header: true,
          footer: true,
          color: "#f4f4f4"

        },
      },
      {
        path: 'confirmed',
        name: 'confirmed',
        component: () => import('@/views/tabBar/order/confirmed/confirmed'),
        meta: {
          title: "已完成订单",
          header: true,
          footer: true,
          color: "#f4f4f4"

        },
      },
      {
        path: 'orderData',
        name: 'orderData',
        component: () => import('@/views/tabBar/order/orderData/orderData'),
        meta: {
          title: "订单详情",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'technology',
        name: 'technology',
        component: () => import('@/views/tabBar/user/technology/technology'),
        meta: {
          title: "技术支持",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'sale',
        name: 'sale',
        component: () => import('@/views/tabBar/sale/sale'),
        meta: {
          title: "售后",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/tabBar/sale/add'),
        meta: {
          title: "申请售后",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'declare',
        name: 'declare',
        component: () => import('@/views/tabBar/sale/declare'),
        meta: {
          title: "寄回产品",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/tabBar/sale/result'),
        meta: {
          title: "售后",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'saleData',
        name: 'saleData',
        component: () => import('@/views/tabBar/sale/saleData'),
        meta: {
          title: "售后信息",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('@/views/tabBar/user/userInfo/userInfo'),
        meta: {
          title: "门店信息",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'uservip',
        name: 'uservip',
        component: () => import('@/views/tabBar/user/uservip/uservip'),
        meta: {
          title: "VIP权益",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'discount',
        name: 'discount',
        component: () => import('@/views/tabBar/user/discount/discount'),
        meta: {
          title: "我的优惠券",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
      {
        path: 'devData',
        name: 'devData',
        component: () => import('@/views/tabBar/sale/devData'),
        meta: {
          title: "物流详情",
          header: true,
          footer: true,
          color: "#f4f4f4"
        },
      },
    ]
  }
]

