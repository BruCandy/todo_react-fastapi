import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { useState } from "react";

registerLocale("ja", ja);

type Prop = {
  setDate: (date: string | null) => void;
};

export const Calendar: React.FC<Prop> = (props) => {
  const { setDate } = props;
  const initialDate = new Date();
  const [startDate, setStartDate] = useState(initialDate);

  const endDate = new Date(initialDate);
  endDate.setDate(endDate.getDate() + 31);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setDate(date.toLocaleDateString());
    }
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"< 前の月"}
      </button>
      <span>
        {date.getFullYear()}年 {date.getMonth() + 1}月
      </span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {"次の月 >"}
      </button>
    </div>
  );

  return (
    <div className="ReservationCalendar">
      <div className="calendar">
        <DatePicker
          locale="ja"
          selected={startDate}
          dateFormatCalendar="yyyy年 MM月"
          dateFormat="yyyy/MM/dd"
          onChange={handleChange}
          minDate={initialDate}
          maxDate={endDate}
          renderCustomHeader={renderCustomHeader}
        />
      </div>
    </div>
  );
};
