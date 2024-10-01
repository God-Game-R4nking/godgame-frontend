import React, { forwardRef, useState } from "react";

// 연도 선택 컴포넌트
const Year = forwardRef((props, ref) => {
    const years = Array.from({ length: 95 }, (_, i) => 2024 - i); // 2024년부터 1930년까지의 연도 배열

    return (
        <select
            className="birthday-year"
            name="year"
            ref={ref}
            style={{ width: '110px', height: '35px', fontSize: '18px'}}
        >
            {years.map(year => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
});

// 월 선택 컴포넌트
const Month = forwardRef(({ onMonthChange }, ref) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12월 배열

    const handleSelect = e => {
        onMonthChange(parseInt(e.target.value)); // 선택된 월을 부모에게 전달
    };

    return (
        <select
            className="birthday-font"
            name="month"
            ref={ref}
            style={{ width: '70px', height: '35px', fontSize: '18px' }}
            onChange={handleSelect}
        >
            {months.map(month => (
                <option key={month} value={month}>
                    {month.toString().padStart(2, '0')} {/* 두 자리 형식으로 포맷팅 */}
                </option>
            ))}
        </select>
    );
});

// 일 선택 컴포넌트
const Day = forwardRef(({ month }, ref) => {
    let days = [];

    // 각 월에 따른 일 수 결정
    const is31DayMonth = [1, 3, 5, 7, 8, 10, 12].includes(month);
    const is30DayMonth = [4, 6, 9, 11].includes(month);

    if (is31DayMonth) {
        days = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (month === 2) {
        days = Array.from({ length: 28 }, (_, i) => i + 1); // 윤년 처리 미포함
    } else if (is30DayMonth) {
        days = Array.from({ length: 30 }, (_, i) => i + 1);
    }

    return (
        <select
            className="birthday-font"
            name="day"
            ref={ref}
            style={{ width: '70px', height: '35px', fontSize: '18px' }}
        >
            {days.map(day => (
                <option key={day} value={day}>
                    {day.toString().padStart(2, '0')} {/* 두 자리 형식으로 포맷팅 */}
                </option>
            ))}
        </select>
    );
});

// 생일 선택 컴포넌트
const BirthDaySelect = forwardRef((props, ref) => {
    const { ref1, ref2, ref3 } = props;
    const [selectedMonth, setSelectedMonth] = useState(1); // 기본 월을 1로 설정

    const handleMonthChange = month => {
        setSelectedMonth(month); // 선택된 월을 상태로 업데이트
    };

    return (
        <div id="birthday-container">
            <div id="birthday-select-area">
                <Year ref={ref1} tabIndex={0} />
                <Month ref={ref2} onMonthChange={handleMonthChange} tabIndex={0} />
                <Day ref={ref3} month={selectedMonth} tabIndex={0} />
            </div>
        </div>
    );
});

export default BirthDaySelect;
