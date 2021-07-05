import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';

function Expenses(props){
    return (
    <Card className = "expenses">
    {/* {console.log(props)}
    {console.log('test')} */}

    {props.items.map((item) => {
      return <ExpenseItem title = {item.title}
      amount = {item.amount}
      date = {item.date}></ExpenseItem>
    })}



    {/*
      The Problem here was that all items rendered in one card
      <ExpenseItem
        title={props.items.map((item) => {
          console.log(item.title)
          return item.title
        }) }
        amount={props.items.map((item) => {
          console.log(item.amount)
          return item.amount
        })}
        date={props.items.map((item) => {
          console.log(item.date.toISOString())
          return item.date
        })}
      ></ExpenseItem>*/}
      

    {/*<ExpenseItem
        title={props.items[0].title}
        amount={props.items[0].amount}
        date={props.items[0].date}
    />
    <ExpenseItem
      title={props.items[1].title}
      amount={props.items[1].amount}
      date={props.items[1].date}
    />
    <ExpenseItem
      title={props.items[2].title}
      amount={props.items[2].amount}
      date={props.items[2].date}
    />
    <ExpenseItem
      title={props.items[3].title}
      amount={props.items[3].amount}
      date={props.items[3].date}
    />*/}
    </Card>
    );
    }
export default Expenses;