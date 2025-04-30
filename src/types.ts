/**
 * 定义创建包装器的参数类型
 * @author siroi
 * @template T - 组件的 props 类型
 */
export type T_CreateWrapper<T> = {
    wrapperClassName: string;
    element: React.FunctionComponent<T>;
};

/**
 * 定义带有 Promise 类型的 props
 * @author siroi
 * @template T - onResolve 函数的返回类型
 */
export type withPromiseType<T> = {
    onResolve?: (() => T) | (() => Promise<T>);
} & object;

/**
 * 获取 onResolve 函数的返回类型
 * @author siroi
 * @template U - 要解析的类型
 */
export type GetOnResolveResultType<U> =
    U extends withPromiseType<infer T>
        ? U extends { onResolve: () => infer R }
            ? Awaited<R>
            : T
        : never;
