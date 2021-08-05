import axios from 'axios'



export const getMybooks = async ()=>{
        try {
            let res = await axios.get('http://localhost:3004/books');
            return { data: res.data , success: true }
           
           
        } catch (error) {
          return { error : error.message , success : false }
        }
    
    }



export const AddNewBook = async (data)=>{
        try {
            const config={
                headers:{ 'Content-Type' : 'application/json'}
            }

            let res = await axios.post('http://localhost:3004/books',data,config);
            return { data: res.data , success: true }
           
           
        } catch (error) {
          return { error : error.message , success : false }
        }
    
    }


export const UpdateBook = async (data)=>{
        try {
            const config={
                headers:{ 'Content-Type' : 'application/json'}
            }

            let res = await axios.put('http://localhost:3004/books/'+data.id,data,config);
            return { data: res.data , success: true }
           
           
        } catch (error) {
          return { error : error.message , success : false }
        }
    
    }

export const DeleteBook = async (id)=>{
        try {
            const config={
                headers:{ 'Content-Type' : 'application/json'}
            }

            let res = await axios.delete('http://localhost:3004/books/'+id);
            return { data: res.data , success: true }
           
           
        } catch (error) {
          return { error : error.message , success : false }
        }
    
    }