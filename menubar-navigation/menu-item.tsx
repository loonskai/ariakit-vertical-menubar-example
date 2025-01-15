import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import * as React from "react";

export interface MenuItemProps extends Ariakit.MenuItemProps {
  label: string;
  href?: string;
  description?: string;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem({ ...props }, ref) {
    const menu = Ariakit.useMenuContext();
    const id = React.useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;
    return (
      <Ariakit.MenuItem
        ref={ref}
        store={menu}
        tabbable
        focusOnHover={false}
        aria-labelledby={labelId}
        aria-describedby={props.description ? descriptionId : undefined}
        {...props}
        className={clsx("menu-item", props.className)}
        render={props.href ? <a href={props.href} /> : undefined}
      >
        <div id={labelId} className="menu-item-label">
          {props.label}
        </div>
        {props.description && (
          <div id={descriptionId} className="menu-item-description">
            {props.description}
          </div>
        )}
      </Ariakit.MenuItem>
    );
  }
);
