import { isAsyncFunction } from 'util/types';
import {
    withPromiseType,
    T_CreateWrapper,
    GetOnResolveResultType,
} from './types';
import { getOrCreateWrapperElement, CreateNewRootInstance } from './utils';
import { createElement } from 'react';

/**
 * 返回一个异步的 React 保证组件唯一
 * @author siroi
 * @template T - 组件的 props 类型，需要满足 withPromiseType 约束
 * @param {T_CreateWrapper<T>} props - 创建包装器的参数，包含包装器类名和要包装的组件
 * @returns {(_props: T) => Promise<GetOnResolveResultType<T>>} - 一个函数，接收组件的 props 并返回一个 Promise
 */
function CreateAsyncWrapper<T extends withPromiseType<any>>(
    props: T_CreateWrapper<T>,
) {
    const { wrapperClassName, element } = props;
    // 获取或创建包装器元素
    const ele = getOrCreateWrapperElement(wrapperClassName);

    return function (_props: T) {
        // 创建一个带有解析器的 Promise
        const { promise, resolve } =
            Promise.withResolvers<GetOnResolveResultType<T>>();
        const { onResolve = () => true } = _props;
        // 创建新的根实例
        const root = CreateNewRootInstance(ele);
        root.render(
            createElement(element, {
                ..._props,
                root,
                onResolve: () => {
                    if (onResolve && isAsyncFunction(onResolve)) {
                        // 如果 onResolve 是异步函数，等待其完成并解析 Promise
                        onResolve().then(
                            (
                                v:
                                    | GetOnResolveResultType<T>
                                    | PromiseLike<GetOnResolveResultType<T>>,
                            ) => {
                                resolve(v);
                            },
                        );
                    } else {
                        // 如果 onResolve 是同步函数，直接解析 Promise
                        resolve(onResolve());
                    }
                },
            }),
        );
        return promise;
    };
}

export { CreateAsyncWrapper };
