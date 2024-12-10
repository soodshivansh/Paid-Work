import User from "../Models/user.models.js";
import Pet from "../Models/pet.models.js";


export const users = async (req,res) => {
    try {
        const users = await User.find();
        const fetchUser = users.filter(({email}) => email != "admin@gmail.com" )
        return res.json(fetchUser);
    } catch (error) {
        console.error('Error fetching users data:', err);
        res.status(400).json({message : "error in fectching users"});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id).exec();
       return res.json({message : "user deleted succesfully"});
    } catch (error) {
        console.error('Error fetching users data:', err);
        res.status(400).json({message : "error in deleting user"});  
    }
}

export const pets = async (req,res) => {
    try {
        const pets = await Pet.find();
        return res.json(pets);
    } catch (error) {
        console.error('Error fetching users data:', err);
        res.status(400).json({message : "error in fectching pets"});
        
    }
}
export const deletePets = async (req,res) => {
    try {
        const id = req.params.id;
        const pets = await Pet.findByIdAndDelete(id).exec();
        return res.json(pets);
    } catch (error) {
        console.error('Error fetching users data:', err);
        res.status(400).json({message : "error in fectching pets"});
        
    }
}


