import React, { useEffect, useState } from 'react';



const Store = () => {

    const [stores, setStores] = useState([])

    useEffect(()=>{
        const data = require('../data/mock_stores.json')
        setStores(data)
        setStores(prevState=>prevState.map(item=>{
            item.store.total=0
            return {...item}
        }))

    },[])



    const monthsIndexArr = [
        {month:"JAN", value:0, total: 0},
        {month:"FEB", value:1, total: 0},
        {month:"MAR", value:2, total: 0},
        {month:"APR", value:3, total: 0},
        {month:"MAY", value:4, total: 0},
        {month:"JUN", value:5, total: 0},
        {month:"JUL", value:6, total: 0},
        {month:"AUG", value:7, total: 0},
        {month:"SEP", value:8, total: 0},
        {month:"OCT", value:9, total: 0},
        {month:"NOV", value:10, total: 0},
        {month:"DEC", value:11, total: 0},
    ]
    const [totalOfMonths, setTotalOfMonths] = useState(monthsIndexArr)



    const [totalOfTotal, setTotalOfTotal] = useState(0)



    const newMonthValue = (e)=>{
        
        stores.find(item=>{
            const changeMonth = item.months.find(item=>{
                if(item.id === e.target.id){
                    if(e.target.value === ''){
                        item.value = 0
                    }else{
                        if(e.target.value === 0){
                            item.value = ''
                        }
                        item.value = Number(e.target.value)
                    }
                }
                return item.id === e.target.id
            })
            return changeMonth
        })

        const index = e.target.id.split('').indexOf('_')
        const arr = e.target.id.split('').splice(index+1).join('')
        const storeId = stores.find(item=>{
            return item.store.id === Number(arr)
        })
        let sumOfStore = 0
        for(let i=0; i<storeId.months.length;i++){
            sumOfStore = sumOfStore+storeId.months[i].value
        }

        setStores(prevState=>prevState.map(item=>{
            if(item.store.id === storeId.store.id){
                item.store.total=sumOfStore
            }
            return {...item}
        }))
       
            
        const nameOfMonth = e.target.name
        const monthsIndex = monthsIndexArr.find(item => item.month == nameOfMonth)
        const emptyTotal = []
        for(let i=0; i<stores.length;i++){
            emptyTotal.push(stores[i].months[monthsIndex.value].value)
        }
        const total = emptyTotal.reduce((prev, next)=>{
            return prev + next
        })
        setTotalOfMonths(prevState=>prevState.map(item=>{
            if(item.month === nameOfMonth){
                item.total = total
            }
            return {...item}
        }))

    }


    useEffect(()=>{
        let tot = 0
            for(let i=0;i<totalOfMonths.length;i++){
                tot = tot + totalOfMonths[i].total
            }
        setTotalOfTotal(tot)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[totalOfMonths])
    


    return (
    <>
        {stores.length
            ?   <div>
                    <table style={{margin:'0 auto', padding:'10px 0 40px'}}>
                        <tbody>
                            <tr>
                                <th>Store Months</th>
                                {stores[0].months.map((item)=>{
                                    return <th key={item.id}>{item.name}</th>
                                })}
                            </tr>
                            {stores.map((item)=>{
                                return  <tr key={item.store.id}>
                                            <td>{item.store.name}</td>
                                            {item.months.map((month)=>{
                                                return  <td key={month.id}>
                                                            <input style={{width:'70px', padding:'2px 5px'}} type="number" value={month.value} onChange={(e)=>newMonthValue(e)} id={month.id} name={month.name}/>
                                                        </td>
                                            })}
                                            <td style={{padding:'0 5px'}}>{item.store.total}</td>
                                        </tr>
                            })}
                            <tr>
                                <th></th>
                                {totalOfMonths.map((item)=>{
                                    return <th key={item.month}>{item.total}</th>
                                })}
                                <th>{totalOfTotal}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            :   <div>Loading</div>
        } 
    </> 
    );
}



export default Store;
