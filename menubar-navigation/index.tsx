import { MenuItem } from "./menu-item.tsx";
import { Menu } from "./menu.tsx";
import { Menubar } from "./menubar.tsx";
import "./style.css";

export default function Example() {
  return (
    <nav aria-label="Example" className="nav">
      <Menubar>
        <Menu
          href="#/services"
          label="Services"
          placement="bottom-start"
          shift={-96}
        >
          <MenuItem
            href="#/webdev"
            label="Web Development"
            description="Professional web development services"
          />
          <MenuItem
            href="#/mobiledev"
            label="Mobile Development"
            description="High-quality mobile application development"
          />
        </Menu>
        <Menu label="Blog" placement="bottom-start" shift={-192}>
          <MenuItem
            href="#/blog/tech"
            label="Tech"
            description="Latest technology news and insights"
          />
          <MenuItem
            href="#/business"
            label="Business"
            description="Business trends and market analysis"
          />
          <MenuItem
            href="#/blog/archives"
            label="Archives"
            description="Access past blog articles"
          />
        </Menu>
        <Menu label="Company">
          <MenuItem
            href="#/aboutus"
            label="About Us"
            description="Learn more about our company"
          />
          <MenuItem
            href="#/hr"
            label="HR"
            description="Jobs and career at our company"
          />
          <MenuItem
            href="#/finance"
            label="Finance"
            description="Financial and investor information"
          />
        </Menu>
        <Menu href="#/contact" label="Contact" />
      </Menubar>
    </nav>
  );
}
