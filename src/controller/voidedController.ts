import { SearchVoided } from "../services/mongo/search";

const voidedController = ()=>{
     const Search=async(req,res)=>{
        try {
            res.json(await SearchVoided().All(req.body));
        } catch (error) {
            res.json(error);
        }
     }
     return{
         search:Search
     }
}
export {voidedController}