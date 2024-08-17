import { formatISO } from "date-fns";
import { useMemo, useState } from "react";

import { useRadioButton } from "./useRadioButton";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useDateTimePicker = (defaultDate?: Value) => {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(defaultDate);
  const { isChecked: isTimeChecked, onChange: onTimeChange, selectedValue: selectedTime } = useRadioButton();

  const dateString = useMemo(() => {
    return selectedDate instanceof Date ? formatISO(selectedDate) : undefined;
  }, [selectedDate]);

  const dateTimeString = useMemo(() => {
    if (dateString) {
      return formatISO(new Date(`${dateString.split("T")[0]} ${selectedTime ?? "00:00"}`)).split("+")[0];
    }
    return undefined;
  }, [dateString, selectedTime, selectedDate]);

  return useMemo(
    () => ({
      date: dateString,
      time: selectedTime,
      dateTime: dateTimeString,
      onSelectDate: setSelectedDate,
      radioControl: { isTimeChecked, onTimeChange },
    }),
    [dateString, dateTimeString, setSelectedDate, isTimeChecked, onTimeChange, selectedTime],
  );
};
