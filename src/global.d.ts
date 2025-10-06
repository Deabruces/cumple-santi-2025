declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Define your custom element 'my-custom-element'
      // and specify its props interface
      selectedcontent: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {};

      // You can also add a catch-all for any unknown intrinsic elements
      // if you want to allow them without strict type-checking
      // [elemName: string]: any;
    }
  }
}
