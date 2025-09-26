// src/types/shims-md.d.ts
declare module '*.md' {
    const content: string;
    export default content;
}

// 如果使用 @ 别名，还需要声明
declare module '@/postDir/****/*.md' {
    const content: string;
    export default content;
}