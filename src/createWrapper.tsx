import { Root } from "react-dom/client";
import { T_CreateWrapper } from "./types";
import { CreateNewRootInstance, getOrCreateWrapperElement } from "./utils";
import { createElement } from "react";
import { isNil } from "@siroi/fe-utils";

/**
 * 单例包装器类，用于管理 React 根实例
 * @author siroi
 */
class SingleWrapper {
  /**
   * 单例实例
   * @static
   */
  static instance: SingleWrapper | null = null;
  /**
   * 存储 React 根实例
   */
  private root: Root | null;

  /**
   * 构造函数
   * @param {Root | null} root - React 根实例
   */
  constructor(root: Root | null) {
    this.root = root;
  }

  /**
   * 获取单例实例，如果实例不存在则创建一个新的
   * @author siroi
   * @static
   * @param {Root} root - React 根实例
   * @returns {SingleWrapper | null} - 单例实例或 null
   */
  static getInstance(root: Root) {
    if ( isNil(this.instance)) {
      this.instance = new SingleWrapper(root);
      return this.instance;
    }
    return null;
  }

  /**
   * 卸载根实例并将单例实例置为 null
   * @author siroi
   */
  unmount() {
    this.root?.unmount();
    SingleWrapper.instance = null;
  }

  /**
   * 渲染 React 元素到根实例
   * @author siroi
   * @param {...Parameters<Root['render']>} p - 渲染所需的参数
   */
  render(...p: Parameters<Root['render']>) {
    this.root?.render(...p);
  }
}

/**
 * 创建一个同步调用的组件包装器，会给被包装的组件透传一个 root 实例，需要在组件内部手动卸载
 * @author siroi
 * @template T - 组件的 props 类型
 * @param {T_CreateWrapper<T>} props - 创建包装器的参数，包含包装器类名和要包装的组件
 * @returns {(_props: T) => void} - 一个函数，接收组件的 props 并渲染组件
 */
function CreateWrapper<T extends object>(
  props: T_CreateWrapper<T>,
): (_props: T) => void {
  const { wrapperClassName, element } = props;
  // 获取或创建包装器元素
  const ele = getOrCreateWrapperElement(wrapperClassName);

  return (_props: T) => {
    // 获取单例包装器实例
    const root = SingleWrapper.getInstance(CreateNewRootInstance(ele));
    if (root) {
      // 渲染组件并传递 root 实例
      root.render(
        createElement<T>(element, { ..._props, root }),
      );
    }
  };
}

export { CreateWrapper };