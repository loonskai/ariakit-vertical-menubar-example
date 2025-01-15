import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import * as React from "react";

export interface MenubarProps extends Ariakit.MenubarProps {}

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  function Menubar(props, ref) {
    return (
      <Ariakit.Menubar
        ref={ref}
        {...props}
        className={clsx("menubar", props.className)}
      >
        <Ariakit.MenuProvider
          placement="right"
          showTimeout={100}
          hideTimeout={250}
        >
          {props.children}
          <Ariakit.Menu
            // This menu component is shared across all menus in the
            // menubar. This enables us to animate the menu position when
            // the user hovers over a menu item.
            portal
            tabIndex={-1}
            unmountOnHide
            className={clsx("menu", props.className)}
            // The menu position styles are applied to the menu wrapper, so
            // we need to add a class name to the wrapper for animation.
            wrapperProps={{ className: "menu-wrapper" }}
          />
        </Ariakit.MenuProvider>
      </Ariakit.Menubar>
    );
  }
);
