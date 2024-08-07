import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Assuming you have Lucide icons imported

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  eventDates: Record<string, number>; // Change to Record to store the count of events per date
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  eventDates = {},
  ...props
}: CalendarProps) {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const modifiers = {
    hasEvent: (date: Date) => {
      const formattedDate = formatDate(date);
      return eventDates[formattedDate] > 0;
    },
    hasMultipleEvents: (date: Date) => {
      const formattedDate = formatDate(date);
      return eventDates[formattedDate] > 1;
    }
  };

  const modifiersClassNames = {
    hasEvent: 'has-event',
    hasMultipleEvents: 'has-multiple-events'
  };

  return (
    <div className="w-full h-full flex justify-center items-center border-10 border-gray-300 rounded-lg">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-4", className, "w-full md:w-10/3 lg:w-1/15")}
        classNames={{
          months: "grid grid-cols-20 gap-2",
          month: "",
          caption: "flex justify-between pt-2 relative items-center",
          caption_label: "text-lg font-medium text-gray-800 text-center absolute left-1/2 transform -translate-x-1/2",
          nav: "flex justify-between items-center w-full",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "order-first",
          nav_button_next: "order-last",
          table: "w-full border-collapse",
          head_row: "grid grid-cols-7 gap-8 mb-2",
          head_cell:
            "text-gray-600 font-normal text-sm text-center",
          row: "grid grid-cols-7 gap-8",
          cell:
            "h-16 w-16 text-center text-sm p-1 relative rounded-md focus-within:relative focus-within:z-20 bg-white border border-gray-200 flex items-center justify-end",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-full w-full p-0 font-normal relative"
          ),
          day_range_end: "bg-blue-200",
          day_selected:
            "bg-cyan-300 text-black hover:bg-cyan-300 hover:text-black focus:bg-cyan-300 focus:text-black",
          day_today: "bg-yellow-200 text-yellow-800",
          day_outside:
            "text-gray-300",
          day_disabled: "text-gray-400 cursor-not-allowed",
          ...classNames,
        }}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
          // Lucide icons for previous and next navigation
        }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
