import React,{useState , useEffect } from 'react'

import { getMybooks } from './util/myActions'

export default function Mybooks() {

    const [ myBooks , setMyBooks ] = useState([]);
    const [Error , setError ] = useState('');



    useEffect( async ()=>{
        let res = await getMybooks();
            console.log(res);
        if (res.success){
            setMyBooks(res.data)
        }else if ( !res.success ){
            setError(res.error)
        }
    },[])


    return (
        <div>
            <h1> My Books </h1>
            {Error ? <p>{Error}</p>:null }
            <div className="parent">
               
               {myBooks.length?myBooks.map(book=>
               
                    <div className=" item" key={book.id}>
                            <div className="img-box">
                                <img src={book.imgPath} /> 
                            </div>

                            <div className="text-box">
                                <h3>{book.title}</h3>
                                <p>{book.des}</p>
                                <p className="price">${book.price}</p>
                            </div>
                    </div>
               )
                :<p>There is no Books Found</p>
               }

               
            </div>

        </div>
    )
}
