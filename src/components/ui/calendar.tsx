import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Assuming you have Lucide icons imported

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="w-full h-full flex justify-center items-center border-10 border-gray-300 rounded-lg">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-4", className, "w-full md:w-10/3 lg:w-1/15")} // Adjusted padding and width to fit within the outlined border
        classNames={{
          months: "grid grid-cols-20 gap-2",
          month: "",
          caption: "flex justify-center pt-2 relative items-center",
          caption_label: "text-lg font-medium text-gray-800",
          nav: "flex justify-between items-center mb-4",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "ml-2",
          nav_button_next: "mr-2",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-gray-600 rounded-md w-12 font-normal text-sm",
          row: "grid grid-cols-7 gap-8",
          cell:
            "h-16 w-16 text-center text-sm p-1 relative rounded-md focus-within:relative focus-within:z-20 bg-white border border-gray-200 flex items-center justify-center",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-full w-full p-0 font-normal"
          ),
          day_range_end: "bg-blue-200",
          day_selected:
            "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
          day_today: "bg-yellow-200 text-yellow-800",
          day_outside:
            "text-gray-300",
          day_disabled: "text-gray-400 cursor-not-allowed",
          ...classNames,
        }}
        
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
          // Lucide icons for previous and next navigation
        }}
        {...props}
      />
    </div>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
