import React, { useState, useEffect } from "react";

import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";

import api from "../../services/api";

import Header from "../../components/Header";

import formatValue from "../../utils/formatValue";
import formatDate from "../../utils/formatDate";

import { Container, CardContainer, Card, TableContainer } from "./styles";

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: "income" | "outcome";
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      let response = await api.get("/transactions");
      let { transactions:Peppa, balance } = response.data;
      
      for(let i = 0; i < Peppa.length; i ++){
        Peppa[i].formattedValue = formatValue(Peppa[i].value)
        Peppa[i].formattedDate = formatDate(new Date((Peppa[i].created_at)))
      }
      console.log(Peppa)


      balance = {
        income: formatValue(Number(balance.income)),
        outcome: formatValue(Number(balance.outcome)),
        total : formatValue(Number(balance.total))
      }

      setTransactions([...Peppa]);
      setBalance(balance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    {transaction.type == 'income'? (<td className="income">{transaction.formattedValue}</td>): (<td className="outcome">{`- ${transaction.formattedValue}`}</td>)}
                    <td>{transaction.category.title}</td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
