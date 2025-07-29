"use client";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/types/general/sidebar";
import Link from "next/link";

interface SidebarSectionProps {
  name?: string;
  items: SidebarItem[];
}

export function SidebarSection({ name, items }: SidebarSectionProps) {
  // Filter top-level items
  const activeItems = items.filter((item) => item.isActive);

  return (
    <SidebarGroup>
      {/* Only render the label if a name is provided */}
      {name && activeItems.length > 0 && (
        <SidebarGroupLabel className="px-4">{name}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {activeItems.map((item) => {
          // Filter sub-items
          const activeSubItems =
            item.items?.filter((sub) => sub.isActive) ?? [];

          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isDefault}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {activeSubItems.length > 0 && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {activeSubItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
