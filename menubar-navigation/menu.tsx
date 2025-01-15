import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import * as React from "react";

export interface MenuProps extends Ariakit.MenuItemProps {
  label: string;
  href?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { label, href, children, ...props },
  ref
) {
  const [menuButton, setMenuButton] = React.useState<HTMLDivElement | null>(
    null
  );

  // By passing the menu context from the MenuProvider component, which is
  // rendered in the Menubar component above, to our menu store, they'll share
  // the same state. In this way, we can control the parent menu store from
  // within this component.
  const context = Ariakit.useMenuContext();
  const menu = Ariakit.useMenuStore({ store: context });
  // Get the menu element rendered by the parent component (contentElement) and
  // use it as the portal element for this menu's contents.
  const parentMenu = Ariakit.useStoreState(menu, "contentElement");
  // Compare the menu button element with the current anchor element set when
  // the menu opens to ascertain whether the menu is open.
  const open = Ariakit.useStoreState(
    menu,
    (state) => state.mounted && state.anchorElement === menuButton
  );

  const item = (
    <Ariakit.MenuItem
      ref={ref}
      store={menu.menubar || undefined}
      tabbable
      blurOnHoverEnd={false}
      {...props}
      className={clsx("menubar-item", props.className)}
      render={href ? <a href={href} /> : undefined}
    >
      {label}
    </Ariakit.MenuItem>
  );

  // If there are no children, this means that this menu item is a leaf node in
  // the menubar, and we can render it as a simple menu item.
  if (!children) return item;

  return (
    // By default, nested menu providers will automatically assign the parent
    // menu store. We need to manually set the parent to null in this case
    // because the parent menu provider isn't really a parent menu, but rather
    // an aggregator.
    <Ariakit.MenuProvider store={menu} parent={null}>
      <Ariakit.MenuButton
        ref={setMenuButton}
        showOnHover
        render={item}
        // Always show the menu when the menu button gets keyboard focus. Also,
        // it's necessary to define the disclosure and anchor elements as this
        // menu can have various potential anchor elements.
        onFocusVisible={(event) => {
          menu.setDisclosureElement(event.currentTarget);
          menu.setAnchorElement(event.currentTarget);
          menu.show();
        }}
        // Ensure the menu is always shown, not toggled, when the menu button is
        // clicked. If the menu button is a link, we don't want to show the menu
        // upon clicking, only on hovering or using arrow keys.
        toggleOnClick={() => {
          if (href) return false;
          menu.show();
          return false;
        }}
      />
      {open && (
        // Render this menu's contents into the parent menu.
        <Ariakit.Portal portalElement={parentMenu} className="menu-contents">
          {children}
        </Ariakit.Portal>
      )}
    </Ariakit.MenuProvider>
  );
});
