import React from "react";
import { Table } from "semantic-ui-react";

import Lang from "../lang/Lang";

class CalendarMonth extends React.Component {
  getMaxDay(month, year) {
    month = (month % 12) + 1;
    if (month === 2) {
      return year % 4 === 0 ? 29 : 28;
    } else if (month < 8 && month !== 0) {
      return month % 2 === 0 ? 30 : 31;
    } else {
      return month % 2 === 1 ? 30 : 31;
    }
  }

  makeDays(numDays, callback = (n) => n + 1) {
    return [...Array(numDays).keys()].map((i) => callback(i));
  }

  makeWeekDays(days) {
    return days.reduce((week, day, index) => {
      week[(index / 7) | 0]
        ? week[(index / 7) | 0].push(day)
        : (week[(index / 7) | 0] = [day]);
      return week;
    }, []);
  }

  makeMonthDays() {
    const { month, year } = this.props;
    this.weekDayOfFirstDay = new Date(year, month, 1).getDay();
    const lastMonthMaxDay = this.getMaxDay(month - 1, year);
    this.thisMonthMaxDay = this.getMaxDay(month, year);
    const previousMonthLastDays = this.makeDays(
      this.weekDayOfFirstDay,
      (n) => n + lastMonthMaxDay - this.weekDayOfFirstDay + 1
    );
    const thisMonthAllDays = this.makeDays(this.thisMonthMaxDay, (n) => n + 1);
    const nextMonthFirstDays = this.makeDays(
      42 - this.thisMonthMaxDay - this.weekDayOfFirstDay,
      (n) => n + 1
    );
    const allDays = [
      ...previousMonthLastDays,
      ...thisMonthAllDays,
      ...nextMonthFirstDays,
    ];
    return this.makeWeekDays(allDays);
  }

  renderMonthDays(day, index) {
    return (
      <Table.Cell
        disabled={
          index < this.weekDayOfFirstDay ||
          index > this.thisMonthMaxDay + this.weekDayOfFirstDay - 1
        }
        key={`${this.props.month}-${index}`}
        className="center"
      >
        {day}
      </Table.Cell>
    );
  }

  renderMonth() {
    return this.makeMonthDays().map((week, weekIndex) => {
      return (
        <Table.Row key={`${this.props.month}-week-${weekIndex}`}>
          {week.map((day, dayIndex) => {
            return this.renderMonthDays(day, weekIndex * 7 + dayIndex);
          })}
        </Table.Row>
      );
    });
  }

  renderHeaderWeek({ abr }) {
    return abr.map((a) => (
      <Table.HeaderCell key={a} className="center">
        {a}
      </Table.HeaderCell>
    ));
  }

  render() {
    return (
      <div className={`calendar-month ${this.props.className}`}>
        <Lang>
          {({ weeks }) => {
            return (
              <Table className="table-month thingy" unstackable>
                <Table.Header attached="top">
                  <Table.Row>{this.renderHeaderWeek(weeks)}</Table.Row>
                </Table.Header>
                <Table.Body>{this.renderMonth()}</Table.Body>
              </Table>
            );
          }}
        </Lang>
      </div>
    );
  }
}

export default CalendarMonth;
