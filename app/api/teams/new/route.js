import Team from '@models/team.js';
import { connectToDB } from '@utils/database';

export const POST=async(req)=>{
	const {user_id,name,description}=await req.json();

	try{
		await connectToDB();

		const newTeam= new Team({name,description,user_id});
		await newTeam.save();

		return new Response(JSON.stringify(newTeam),{status:201});
    } catch (error) {
    	console.log("Error",error);
    	if(error?.code==11000){
    		return new Response("Team name is already registered!!!",{status:500});
    	}
        return new Response("Failed to create a new team", { status: 500 });
    }

}