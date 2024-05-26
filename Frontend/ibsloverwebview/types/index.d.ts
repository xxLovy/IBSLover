// /* eslint-disable no-unused-vars */

// // ====== USER PARAMS
// declare type CreateUserParams = {
//     clerkId: string;
//     email: string;
//     username: string;
//     firstName: string | null;
//     lastName: string | null;
//     photo: string;
// };

// declare type UpdateUserParams = {
//     firstName: string | null;
//     lastName: string | null;
//     username: string;
//     photo: string;
// };

// // ====== IMAGE PARAMS
// declare type AddImageParams = {
//     image: {
//         title: string;
//         publicId: string;
//         transformationType: string;
//         width: number;
//         height: number;
//         config: any;
//         secureURL: string;
//         transformationURL: string;
//         aspectRatio: string | undefined;
//         prompt: string | undefined;
//         color: string | undefined;
//     };
//     userId: string;
//     path: string;
// };

// declare type UpdateImageParams = {
//     image: {
//         _id: string;
//         title: string;
//         publicId: string;
//         transformationType: string;
//         width: number;
//         height: number;
//         config: any;
//         secureURL: string;
//         transformationURL: string;
//         aspectRatio: string | undefined;
//         prompt: string | undefined;
//         color: string | undefined;
//     };
//     userId: string;
//     path: string;
// };

// declare type Transformations = {
//     restore?: boolean;
//     fillBackground?: boolean;
//     remove?: {
//         prompt: string;
//         removeShadow?: boolean;
//         multiple?: boolean;
//     };
//     recolor?: {
//         prompt?: string;
//         to: string;
//         multiple?: boolean;
//     };
//     removeBackground?: boolean;
// };

// // ====== TRANSACTION PARAMS
// declare type CheckoutTransactionParams = {
//     plan: string;
//     credits: number;
//     amount: number;
//     buyerId: string;
// };

// declare type CreateTransactionParams = {
//     stripeId: string;
//     amount: number;
//     credits: number;
//     plan: string;
//     buyerId: string;
//     createdAt: Date;
// };

// declare type TransformationTypeKey =
//     | "restore"
//     | "fill"
//     | "remove"
//     | "recolor"
//     | "removeBackground";

// // ====== URL QUERY PARAMS
// declare type FormUrlQueryParams = {
//     searchParams: string;
//     key: string;
//     value: string | number | null;
// };

// declare type UrlQueryParams = {
//     params: string;
//     key: string;
//     value: string | null;
// };

// declare type RemoveUrlQueryParams = {
//     searchParams: string;
//     keysToRemove: string[];
// };

// declare type SearchParamProps = {
//     params: { id: string; type: TransformationTypeKey };
//     searchParams: { [key: string]: string | string[] | undefined };
// };

// declare type TransformationFormProps = {
//     action: "Add" | "Update";
//     userId: string;
//     type: TransformationTypeKey;
//     creditBalance: number;
//     data?: IImage | null;
//     config?: Transformations | null;
// };

// declare type TransformedImageProps = {
//     image: any;
//     type: string;
//     title: string;
//     transformationConfig: Transformations | null;
//     isTransforming: boolean;
//     hasDownload?: boolean;
//     setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
// };

declare type threeCases = "yes" | "no" | "dontknow"
declare type features = {
    women: threeCases;
    men: threeCases;
    accessible: threeCases;
    genderNeutral: threeCases;
    children: threeCases;
    free: threeCases;
    fee?: number;
}

declare type Toilet = {
    name: string;
    description?: string;
    location: {
        type: string;
        coordinates: number[]; // [longitude, latitude]
    };
    lastUpdateTime: string;
    openingHours?: Date;
    isOpening?: boolean;
    features?: features;
    isRemoved: boolean;
    votesCount?: number;
    isFromUser: boolean;
    keyword?: string;
    users?: string[];
    removeMsg?: string;
    _id: string;
    __v?: string;
}