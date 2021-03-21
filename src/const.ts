export namespace CONST {
  export namespace API {
    export const HEADER = {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': process.env.API_SERVER as string,
      'X-REQUESTED-BY-SCENERY-FRONT': true,
      'Accept': 'application/json',
    };
  }

  export namespace AUTH {
    export const LINKS = [
      '/user'
    ];
    export const AUTH_LINKS = [
      '/auth/signin',
      '/auth/signup',
      '/aush/setup',
    ]
  }

  export namespace LAYOUT {
    export const MENU = [
      // {
      //   icon: 'mdi-account-outline',
      //   title: 'ユーザホーム',
      //   link: '/user/undefined',
      // },
      // {
      //   icon: 'mdi-image-multiple',
      //   title: '投稿一覧',
      //   link: '/user/undefined#mybox',
      // },
      // {
      //   icon: 'mdi-heart-outline',
      //   title: 'お気に入り',
      //   link: '/user/undefined#favorite',
      // },
      // {
      //   icon: 'mdi-shoe-print',
      //   title: '行きたい',
      //   link: '/user/undefined#wannago',
      // },
      // {
      //   title: 'divider',
      // },
      // {
      //   icon: 'mdi-cog-outline',
      //   title: 'ユーザ設定',
      //   link: '/setting',
      // },
      // {
      //   title: 'divider',
      // },
      // {
      //   icon: 'mdi-logout',
      //   title: 'ログアウト',
      //   link: '/auth/logout',
      // },
    ];
  }

  export namespace FORM {
    export const ITEMS = [
      {
        id: 'user_name',
        type: 'username',
        placeholder: 'ユーザ名',
        required: true,
        unique: true,
        max: 255,
      },
      {
        id: 'display_name',
        type: 'text',
        placeholder: '表示名',
        required: true,
        max: 255,
      },
      {
        id: 'birthday',
        type: 'date',
        placeholder: '誕生日',
      },
      {
        id: 'gender',
        type: 'select',
        placeholder: '性別',
        select: [{title: '男性', value: 1}, {title: '女性', value: 2}, {title: 'その他', value: 3}],
      },
      {
        id: 'twitter_id',
        type: 'text',
        placeholder: 'Twitter ID',
        icon: 'mdi-twitter',
        required: false,
        max: 15,
        min: 4,
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'メールアドレス',
        required: true,
        unique: true,
        max: 255,
      },
      {
        id: 'password',
        type: 'password',
        placeholder: 'パスワード',
        required: true,
      },
      {
        id: 'password2',
        type: 'password',
        same: 'password',
        placeholder: 'パスワード(確認)',
        required: true,
      },
    ];
  }

  export namespace FOOTER {
    export const MENU = [
      {
        title: 'About',
        child: [
          {title: 'Sceneryとは？', link: '/about/scenery'},
          {title: 'よくある質問', link: '/about/qa'},
          {title: '運営について', link: '/about/me'},
        ],
      },
      {
        title: 'Legal',
        child: [
          {title: '利用規約', link: '/legal/terms'},
          {title: 'プライバシーポリシー', link: '/legal/privacy'},
        ],
      },
      {
        title: 'Link',
        child: [
          {title: 'お問い合わせ', link: 'https://forms.gle/QVoXDibDa2TgVPPR6'},
          {title: 'Twitter', link: 'https://twitter.com/scenery_cam'},
        ],
      },
    ];
  }

  export namespace BOX {
    export const MENU = [
      {icon: 'mdi-delete', title: '削除', key: 'delete', color: 'danger', auth: false},
      {icon: 'mdi-alarm-light', title: '通報', key: 'report', color: 'yellow', auth: true}
    ]
    export const REPORT = [
      {title: '権利の侵害', value: 1},
      {title: '違法な内容', value: 2},
      {title: 'わいせつまたはポルノな内容', value: 3},
      {title: '第3者に誤解を与えるなりすまし', value: 4},
      {title: 'スパムおよびシステムへの攻撃', value: 5},
    ]
  }

  export namespace CLIENT {
    export const BASE_URL = process.env.BASE_URL as string;
  }

  export namespace IMAGESET {
    export const OPTION = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1280
    }
  }
}
