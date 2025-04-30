import { createRoot } from "react-dom/client";

/**
 * 创建一个新的 React 根实例
 * @author siroi
 * @param {HTMLElement} container - 用于创建根实例的 HTML 元素
 * @returns {Root} - 创建好的 React 根实例
 */
const CreateNewRootInstance = (container: HTMLElement) => createRoot(container);

/**
 * 判断一个函数是否为异步函数
 * @author siroi
 * @template T - 函数的返回类型
 * @param {() => T | Promise<T>} func - 要判断的函数
 * @returns {func is () => Promise<T>} - 如果是异步函数返回 true，否则返回 false
 */
function isAsyncFunction<T>(
  func: () => T | Promise<T>,
): func is () => Promise<T> {
  return func.constructor.name === "AsyncFunction";
}

/**
 * 获取或创建包装器元素的辅助函数
 * @author siroi
 * @param {string} wrapperClassName - 包装器元素的类名
 * @returns {HTMLElement} - 包装器元素
 */
function getOrCreateWrapperElement(wrapperClassName: string) {
  let ele = document.querySelector(
    `.${wrapperClassName}`,
  ) as HTMLElement | null;
  if (!ele) {
    ele = document.createElement("div");
    ele.className = wrapperClassName;
    document.body.appendChild(ele);
  }
  return ele;
}

export { CreateNewRootInstance, isAsyncFunction, getOrCreateWrapperElement };
