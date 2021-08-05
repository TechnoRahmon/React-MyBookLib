import React ,{ useEffect , useState } from 'react'
import { Link } from 'react-router-dom';
import { getMybooks , AddNewBook , UpdateBook , DeleteBook } from './../util/myActions'

export default function Admin() {

    const [ myBooks , setMyBooks ] = useState([]);
    const [ErrorGetBook , setErrorGetBook ] = useState('');
    const [ErrorAddNewBook, setErrorAddNewBook ] = useState('');
    const [ErrorUpdateBook, setErrorUpdateBook ] = useState('');

    const [ID , setID ] = useState('');
    const [title , setTitle ] = useState('');
    const [price , setPrice ] = useState('');
    const [url , setUrl ] = useState('');
    const [description , setDescription ] = useState('');
    const [ErrorValidation , setErrorValidation ] =useState({ title:'', price:'', url:'',description:'' })
    const [SubmitingMode , setSubmitingMode ]= useState('Add')

    const inputChange =(e)=>{
        if (!e.target.value ){
            setErrorValidation({...ErrorValidation , [e.target.id]:e.target.id +' Should not be empty' })
        }else{
            setErrorValidation({...ErrorValidation , [e.target.id]:'' })
        }

        switch (e.target.id) {
            case 'title':
                setTitle(e.target.value)
            break;
            case 'price':
                setPrice(e.target.value)
            break;
            case 'url':
                setUrl(e.target.value)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
        
            default:
                break;
        }

    }

    const _SubmitHandling= async (e)=>{
            e.preventDefault();
        let data ={
            title : title ,
            price: price,
            imgPath:url,
            des: description
        }
        setErrorUpdateBook('');
        setErrorAddNewBook('');
        
        // check the SubmitingMode (Adding OR Updating )
        if (SubmitingMode === 'Add'){
             // adding new Book
            let res = await AddNewBook(data);
            if (res.success){
                alert('you have added a New book successfully!')
            }else{
                setErrorAddNewBook(res.error)
            }
        }else if( SubmitingMode === 'Update'){
            data.id= ID;
            // update a specific book
            let res = await UpdateBook(data);
            if (res.success){
                alert('you have updated your book successfully!')
            }else{
                setErrorUpdateBook(res.error)
            }
        }
    }

    const ActivateUpdateMode = (data)=>{
        // toggle to update mode
        setSubmitingMode('Update');

        // insert the book data into the state 
        setTitle(data.title)
        setPrice(data.price)
        setUrl(data.imgPath)
        setDescription(data.des)
        setID(data.id)

    }

    useEffect( async ()=>{
        let res = await getMybooks();
            console.log(res);
        if (res.success){
            setMyBooks(res.data)
        }else if ( !res.success ){
            setErrorGetBook(res.error)
        }
    },[])


    return (
        <div>
           <h1>Books Dashboard </h1> 
            {/* Adding Book Form  */}

            <form className="row w-50 mx-auto my-5" onSubmit={_SubmitHandling}>
                {ErrorAddNewBook?<p className="text-danger text-start">{ErrorAddNewBook}  </p>:null} 
                {ErrorUpdateBook?<p className="text-danger text-start">{ErrorUpdateBook}  </p>:null} 
                <div className="col-12 mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Book Title"
                    value={title} onChange={inputChange} />
                    {ErrorValidation.title ? <p className="text-danger text-start mb-0">{ErrorValidation.title}</p>
                    :null
                    }
                </div>

                
                <div className="col-12 mb-3">
                    <input type="number" className="form-control" id="price" placeholder="Book Price" 
                    value={price} onChange={inputChange}/>
                    {ErrorValidation.price ? <p className="text-danger text-start mb-0">{ErrorValidation.price}</p>
                    :null
                    }
                </div>


                
                <div className="col-12 mb-3">
                    <input type="text" className="form-control" id="url" placeholder="Book Image Url" 
                    value={url} onChange={inputChange}/>
                    {ErrorValidation.url ? <p className="text-danger text-start mb-0">{ErrorValidation.url}</p>
                    :null
                    }
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control ps-3" placeholder="Book Description" id="description" style={{height: 100}}  
                        value={description} onChange={inputChange}/>
                    <label htmlFor="description" className="ms-3">Book Description</label>
                    {ErrorValidation.description ? <p className="text-danger text-start mb-0">{ErrorValidation.description}</p>
                    :null
                    }
                </div>



                <button  className="btn btn-primary " disabled={!title || !price || !url || !description} >{SubmitingMode}</button>

            </form>




            {/* Books List */}
           <div className="mt-5"> 
           {ErrorGetBook? <p className="text-danger">{ErrorGetBook} </p> : null }
                {myBooks.length?myBooks.map(book=>
                
                <div className="d-flex justify-content-between 
                align-items-baseline
                rowbox">
                    <div className="img-box-admin">
                        <img src={book.imgPath} /> 
                    </div>
                    <h3>{book.title}</h3>
                    <p>{book.des}</p>
                    <h4>${book.price}</h4>
                    <div>
                   <Link to="#"><i class="fas fa-edit me-3 text-warning fs-5"
                   onClick={()=>{ ActivateUpdateMode(book) }}></i> </Link> 
                    <Link to="#"> <i class="fas fa-minus-circle text-danger fs-5 me-2"
                        onClick={()=>{  if(window.confirm('Are you sure that you want to delete book :'+book.title+' ?')){
                                            DeleteBook(book.id)}}
                                }></i></Link>
                    </div>
                </div>
                
                )
                :
                <h4>Can't find any book</h4>
                }
           </div>
        </div>
    )
}
