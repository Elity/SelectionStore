export default const SelectionStore = (function SelectionStore() {
  let saved = null;
  return {
    // 失去焦点时保存选取
    save() {
      if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          return (saved = sel.getRangeAt(0));
        }
      } else if (document.selection && document.selection.createRange) {
        return (saved = document.selection.createRange());
      }
      saved = null;
    },

    // 获取焦点时 恢复选取
    restore() {
      if (saved) {
        if (window.getSelection) {
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(saved);
        } else if (document.selection && saved.select) {
          saved.select();
        }
      }
    }
  };
})()
