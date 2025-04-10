
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger, SidebarInset} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.home className="mr-2 h-4 w-4"/>
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.workflow className="mr-2 h-4 w-4"/>
                  <span>Forms</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <Button variant="outline">New Form</Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <h1>Welcome to FormFlow</h1>
          <p>Build your forms with ease.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

