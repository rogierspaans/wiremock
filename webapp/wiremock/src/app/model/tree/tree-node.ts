import { Item } from "../wiremock/item";

export class TreeNode {
  constructor(
    public value: Item,
    public depth: number,
    public parent?: TreeNode,
    public children: TreeNode[] = [],
    public collapsed = false
  ) {}

  isLeaf() {
    return this.children.length === 0;
  }

  hasChildren() {
    return !this.isLeaf();
  }

  isHidden() {
    if (this.parent) {
      return this.parent.isParentHidden();
    }
    return false;
  }

  private isParentHidden(): boolean {
    if (this.collapsed) {
      return true;
    } else if (this.parent) {
      return this.parent.isParentHidden();
    }
    return false;
  }

  expandParents() {
    if (this.parent) {
      this.parent.collapsed = false;
      this.parent.expandParents();
    }
  }
}
