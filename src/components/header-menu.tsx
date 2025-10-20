import { UserRound } from "lucide-react";
import { LogoutDialog } from "@/components/logout-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type HeaderMenuProps = {
  logout: () => void;
};

export function HeaderMenu({ logout }: HeaderMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserRound />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <LogoutDialog logout={logout} />
      </PopoverContent>
    </Popover>
  );
}
