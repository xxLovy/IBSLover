export const navlinks = [
    {
        lable: "Add a toilet",
        route: "/addToilet"
    },
    {
        lable: "About",
        route: "/about"
    },
    {
        lable: "Feedback",
        route: ""
    },
    {
        lable: "Contant",
        route: "/Contant"
    },
]

export const sidebarItems = [
    {
        lable: "Filter",
        icon: "",
        click: "Filter"
    },
    {
        lable: "Add a toilet",
        icon: "",
        click: "Add"
    },
    {
        lable: "Panic",
        icon: "",
        click: "Find"
    },
    {
        lable: "List View",
        icon: "",
        click: "List"
    }
]


export const dummyToilets: Toilet[] = [
    {
        location: {
            type: "Point",
            coordinates: [102, 0.5]
        },
        features: {
            women: "yes",
            men: "no",
            accessible: "dontknow",
            children: "no",
            free: "yes",
            fee: 0,
            genderNeutral: "dontknow"
        },
        _id: "664b0c33ea87814171f29706",
        name: "Toilet 1",
        description: "Description for Toilet 1",
        lastUpdateTime: "2024-05-20T08:39:15.996Z",
        openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
        isOpening: true,
        isRemoved: false,
        votesCount: 5,
        isFromUser: true,
        keyword: "clean",
        users: ["user1"],
        removeMsg: "Not removed",
        __v: 0
    },
    {
        location: {
            type: "Point",
            coordinates: [103, 1.5]
        },
        features: {
            women: "no",
            men: "yes",
            accessible: "dontknow",
            children: "yes",
            free: "no",
            fee: 2,
            genderNeutral: "dontknow"
        },
        _id: "664b0c34ea87814171f29707",
        name: "Toilet 2",
        description: "Description for Toilet 2",
        lastUpdateTime: "2024-05-20T08:39:15.996Z",
        openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
        isOpening: false,
        isRemoved: false,
        votesCount: 10,
        isFromUser: true,
        keyword: "busy",
        users: ["user2"],
        removeMsg: "Not removed",
        __v: 0
    },
    {
        location: {
            type: "Point",
            coordinates: [120.153576, 30.287459]
        },
        features: {
            women: "yes",
            men: "yes",
            accessible: "yes",
            children: "yes",
            free: "yes",
            genderNeutral: "dontknow"
        },
        _id: "664b122591ac3fac2a595bbd",
        name: "Updated Public Toilet",
        description: "Updated description",
        lastUpdateTime: "2024-05-20T09:23:53.173Z",
        openingHours: new Date("2024-05-20T09:23:53.173Z"), // 转换为 Date 对象
        isOpening: true,
        isRemoved: false,
        votesCount: 1,
        isFromUser: true,
        users: [
            "664b0c3e4bbc29fd613b8342",
            "664b0c3e4bbc29fd613b8342",
            "664b0c3e4bbc29fd613b8342"
        ],
        __v: 1
    },
    {
        location: {
            type: "Point",
            coordinates: [102, 0.5]
        },
        features: {
            women: "yes",
            men: "no",
            accessible: "dontknow",
            children: "no",
            free: "yes",
            fee: 0,
            genderNeutral: "dontknow"
        },
        _id: "664b0c33ea87814171f29706",
        name: "Toilet 1",
        description: "Description for Toilet 1",
        lastUpdateTime: "2024-05-20T08:39:15.996Z",
        openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
        isOpening: true,
        isRemoved: false,
        votesCount: 5,
        isFromUser: true,
        keyword: "clean",
        users: ["user1"],
        removeMsg: "Not removed",
        __v: 0
    },
    {
        location: {
            type: "Point",
            coordinates: [103, 1.5]
        },
        features: {
            women: "no",
            men: "yes",
            accessible: "dontknow",
            children: "yes",
            free: "no",
            fee: 2,
            genderNeutral: "dontknow"
        },
        _id: "664b0c34ea87814171f29707",
        name: "Toilet 2",
        description: "Description for Toilet 2",
        lastUpdateTime: "2024-05-20T08:39:15.996Z",
        openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
        isOpening: false,
        isRemoved: false,
        votesCount: 10,
        isFromUser: true,
        keyword: "busy",
        users: ["user2"],
        removeMsg: "Not removed",
        __v: 0
    },
    {
        location: {
            type: "Point",
            coordinates: [120.153576, 30.287459]
        },
        features: {
            women: "yes",
            men: "yes",
            accessible: "yes",
            children: "yes",
            free: "yes",
            genderNeutral: "dontknow"
        },
        _id: "664b122591ac3fac2a595bbd",
        name: "Updated Public Toilet",
        description: "Updated description",
        lastUpdateTime: "2024-05-20T09:23:53.173Z",
        openingHours: new Date("2024-05-20T09:23:53.173Z"), // 转换为 Date 对象
        isOpening: true,
        isRemoved: false,
        votesCount: 1,
        isFromUser: true,
        users: [
            "664b0c3e4bbc29fd613b8342",
            "664b0c3e4bbc29fd613b8342",
            "664b0c3e4bbc29fd613b8342"
        ],
        __v: 1
    }
];

export const checkboxItems = [
    {
        label: "Women",
        key: "women"
    },
    {
        label: "Men",
        key: "men"
    },
    {
        label: "Accessible",
        key: "accessible"
    },
    {
        label: "Children",
        key: "children"
    },
    {
        label: "Free",
        key: "free"
    },
    {
        label: "Gender Neutral",
        key: "genderNeutral"
    }
];