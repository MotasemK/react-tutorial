import './ExpenseDate.css'

function ExpenseDate(props) {
    let month
    let day
    let year

    console.log("ExpenseDate Output")
    console.log(props)
    // props.date.forEach(element => {
    //   month = element.toLocaleString('en-US', {month: 'long'})
    //   day = element.toLocaleString('en-US', {day: '2-digit'})
    //   year = element.getFullYear();
     
    // })

    month = props.date.toLocaleString('en-US', {month: 'long'})
    day = props.date.toLocaleString('en-US', {day: '2-digit'})
    year = props.date.getFullYear();
   
    return (
      <div className = "expense-date">
      <div className = "expense-date__month">{month}</div>
      <div className = "expense-date__year">{year}</div>
      <div className = "expense-date__day">{day}</div>
    </div>
  );
    
    
}

export default ExpenseDate;