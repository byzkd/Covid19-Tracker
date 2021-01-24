import React from 'react'
import Card from './Card';
import NumberFormat from 'react-number-format';

const CovidSummary = (props) => {
    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
         country
    } = props;
    return (
        <div>
        <div>
          <h1 style = {{textTransform: 'capitalize',  marginTop: '20px'}}>{country === '' ? 'Dünya Çapında Covid-19 Raporu' : country}</h1>
          <div style = {{display: 'flex', justifyContent: 'center'}}>
          <Card>
            <span>Toplam Vaka Sayısı</span><br/>
            <span>{<NumberFormat 
            value = {totalConfirmed} 
            displayType= {'text'}
            thousandSeparator = {true}
            />}
            </span>
          </Card>
          <Card>
            <span>Toplam İyileşen Vaka Sayısı</span><br/>
            <span>{<NumberFormat 
            value = {totalRecovered} 
            displayType= {'text'}
            thousandSeparator = {true}
            />}</span>
          </Card>
          <Card>
            <span>Toplam Ölü Sayısı</span><br/>
            <span>{<NumberFormat 
            value = {totalDeaths} 
            displayType= {'text'}
            thousandSeparator = {true}
            />}</span>
          </Card>
          </div>
          
        </div>
      </div>

    )
}
export default CovidSummary
