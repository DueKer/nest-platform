# nest-platform
该项目包含一个后端使用Nest框架的应用和一个前端使用React、Antd、TypeScript和Vite的应用。

## 项目结构
```
nest-platform
├── nest-admin          # 后端项目
│   ├── src
│   │   ├── main.ts     # 后端应用的入口点
│   │   └── app.module.ts # 应用的根模块
│   ├── package.json    # npm配置文件
│   ├── tsconfig.json   # TypeScript配置文件
│   └── README.md       # 后端项目文档
├── web-admin           # 前端项目
│   ├── src
│   │   ├── main.tsx    # 前端应用的入口点
│   │   ├── App.tsx     # 主应用组件
│   │   ├── components   # 可复用的React组件
│   │   └── pages       # 不同页面的组件
│   ├── public          # 静态文件
│   ├── package.json    # npm配置文件
│   ├── tsconfig.json   # TypeScript配置文件
│   ├── vite.config.ts   # Vite配置文件
│   └── README.md       # 前端项目文档
└── README.md           # 整个项目文档
```

## 使用说明
1. **后端项目**: 进入 `nest-admin` 目录，使用 `npm install` 安装依赖，然后使用 `npm run start` 启动后端服务。
2. **前端项目**: 进入 `web-admin` 目录，使用 `npm install` 安装依赖，然后使用 `npm run dev` 启动前端开发服务器。

## 贡献
欢迎提交问题和拉取请求！