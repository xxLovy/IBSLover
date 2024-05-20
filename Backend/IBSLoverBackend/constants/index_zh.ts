export const navLinks = [
    {
        label: "首页",
        route: "/",
        icon: "/assets/icons/home.svg",
    },
    {
        label: "图像恢复",
        route: "/transformations/add/restore",
        icon: "/assets/icons/image.svg",
    },
    {
        label: "生成填充",
        route: "/transformations/add/fill",
        icon: "/assets/icons/stars.svg",
    },
    {
        label: "移除对象",
        route: "/transformations/add/remove",
        icon: "/assets/icons/scan.svg",
    },
    {
        label: "重新着色对象",
        route: "/transformations/add/recolor",
        icon: "/assets/icons/filter.svg",
    },
    {
        label: "背景移除",
        route: "/transformations/add/removeBackground",
        icon: "/assets/icons/camera.svg",
    },
    {
        label: "个人资料",
        route: "/profile",
        icon: "/assets/icons/profile.svg",
    },
    {
        label: "购买积分",
        route: "/credits",
        icon: "/assets/icons/bag.svg",
    },
];

export const plans = [
    {
        _id: 1,
        name: "免费",
        icon: "/assets/icons/free-plan.svg",
        price: 0,
        credits: 20,
        inclusions: [
            {
                label: "20 免费积分",
                isIncluded: true,
            },
            {
                label: "基本服务访问权限",
                isIncluded: true,
            },
            {
                label: "优先客户支持",
                isIncluded: false,
            },
            {
                label: "优先更新",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 2,
        name: "专业套餐",
        icon: "/assets/icons/free-plan.svg",
        price: 40,
        credits: 120,
        inclusions: [
            {
                label: "120 积分",
                isIncluded: true,
            },
            {
                label: "完整服务访问权限",
                isIncluded: true,
            },
            {
                label: "优先客户支持",
                isIncluded: true,
            },
            {
                label: "优先更新",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 3,
        name: "高级套餐",
        icon: "/assets/icons/free-plan.svg",
        price: 199,
        credits: 2000,
        inclusions: [
            {
                label: "2000 积分",
                isIncluded: true,
            },
            {
                label: "完整服务访问权限",
                isIncluded: true,
            },
            {
                label: "优先客户支持",
                isIncluded: true,
            },
            {
                label: "优先更新",
                isIncluded: true,
            },
        ],
    },
];

export const transformationTypes = {
    restore: {
        type: "restore",
        title: "恢复图像",
        subTitle: "通过消除噪声和瑕疵来优化图像",
        config: { restore: true },
        icon: "image.svg",
    },
    removeBackground: {
        type: "removeBackground",
        title: "移除背景",
        subTitle: "使用人工智能移除图像的背景",
        config: { removeBackground: true },
        icon: "camera.svg",
    },
    fill: {
        type: "fill",
        title: "生成填充",
        subTitle: "使用人工智能外部绘制增强图像的尺寸",
        config: { fillBackground: true },
        icon: "stars.svg",
    },
    remove: {
        type: "remove",
        title: "对象移除",
        subTitle: "识别并消除图像中的对象",
        config: {
            remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: "scan.svg",
    },
    recolor: {
        type: "recolor",
        title: "对象着色",
        subTitle: "识别并为图像中的对象着色",
        config: {
            recolor: { prompt: "", to: "", multiple: true },
        },
        icon: "filter.svg",
    },
};

export const aspectRatioOptions = {
    "1:1": {
        aspectRatio: "1:1",
        label: "正方形 (1:1)",
        width: 1000,
        height: 1000,
    },
    "3:4": {
        aspectRatio: "3:4",
        label: "标准竖向 (3:4)",
        width: 1000,
        height: 1334,
    },
    "9:16": {
        aspectRatio: "9:16",
        label: "手机竖向 (9:16)",
        width: 1000,
        height: 1778,
    },
};

export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
};

export const creditFee = -1;
