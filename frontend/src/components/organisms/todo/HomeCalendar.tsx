import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { isSameDay } from "date-fns";
import { TodoType } from "../../../types/api/todo";
import styled from "styled-components";

registerLocale("ja", ja);

type Props = {
  todos: TodoType[];
};

export const HomeCalendar: React.FC<Props> = ({ todos }) => {
  const renderDayContents = (day: number, date: Date) => {
    const todosForDay = todos.filter((todo) =>
      isSameDay(new Date(todo.date), date)
    );
    return (
      <div>
        <span>{day}</span>
        {todosForDay.length > 0 && <span> 🔴</span>}
      </div>
    );
  };

  return (
    <CustomDatePickerWrapper>
      <DatePicker inline locale="ja" renderDayContents={renderDayContents} />
    </CustomDatePickerWrapper>
  );
};

const CustomDatePickerWrapper = styled.div`
  text-align: center;
  .react-datepicker {
    width: 100%;
    max-width: 333px; /* 必要に応じて調整 */
    margin: 0 auto;
  }

  .react-datepicker__day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .react-datepicker__header {
    font-size: 1.2rem;
  }

  .react-datepicker__current-month {
    font-size: 1.5rem;
  }
`;
