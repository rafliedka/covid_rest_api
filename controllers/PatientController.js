//import patient model
const Patient = require("../models/Patient.js");

//create PatientController class
class PatientController{

    /**
     * creating index method for show all data from patients table from database
     * @param {any} req for recieving data
     * @param {any} res for giving response
     * @returns for giving back a response like status and json data
     */
    async index(req, res) {
        //call static all method
        const patients = await Patient.all();
        
        if (patients.lenght < 1) {
            const data = {
                message: "Patients data is empty",
            };

            return res.status(200).json(data);
        } else {
            const data = {
                message: "Show all patients data",
                data: patients,
            };

            return res.status(200).json(data);
        }
    }

    /**
     * creating store method for input data patient to database
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {create} method for creating data where data has been inputed on form
     * @returns for giving back a response like status and json data
     */
    async store(req, res) {
 
        const patients = await Patient.create(req.body);
    
        const data = {
          message: "Resource is added successfully",
          data: patients,
        };
    
        return res.status(201).json(data);
    }

    /**
     * creating show method to showing detail only 1 data searched by id
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {id} req patient id want to search
     * @param {find} method for searching id
     * @returns for giving back a response like status and json data
     */
    async show(req, res) {
        const {id} = req.params;
        const patient = await Patient.find(id);

        if (patient) {
            const data = {
                message: "got detail patient data",
                data: patient,
            };

            return res.status(200).json(data);
        } else {
            const data = {
                message: "Patient data not found",
            };

            return res.status(404).json(data);
        }
    }

    /**
     * creating update method to edit patient data from database
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {id} req patient id want to search
     * @param {find} method for searching id
     * @param {update} method for updating edited data
     * @returns for giving back a response like status and json data
     */
    async update(req, res) {
        const {id} = req.params;
        const patient = await Patient.find(id);

        if (patient) {
            const patient = await Patient.update(id, req.body);

            const data = {
                message: "patient data has been updated",
                data: patient,
            };

            return res.status(200).json(data);
        } else {
            const data = {
                message: "data patient not found",
            }

            return res.status(404).json(data);
        }
    }

    /**
     * creating destroy method to delete data from database
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {id} req patient id want to search
     * @param {find} method for searching id
     * @param {delete} method for deleting data from table
     * @returns for giving back a response like status and json data
     */
    async destroy(req, res) {
        const {id} = req.params;
        const patient = await Patient.find(id);
        
        if (patient) {
            await Patient.delete(id);

            const data = {
                message: "patient data has been deleted",
            };

            return res.status(200).json(data);
        } else {
            const data = {
                message: "patient data not found",
            };

            return res.status(404).json(data);
        }
    }

    /**
     * creating search method by name
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {name} req patient name want to search
     * @param {search} method for searching patient name
     * @returns for giving back a response like status and json data
     */
    async search(req, res) {
        const {name} = req.params;
        const patients = await Patient.search(name);

        if (patients) {
            const data = {
                message: "patient name not found",
            };

            return res.status(404).json(data);
        } else {
            const data = {
                message: `all patients data with name ${name}`,
                data: patients,
            };

            return res.status(200).json(data);
        }
    }

    /**
     * creating patient data based on "positive" status
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {findByStatus} method used for search patient data based on writed status
     * @returns for giving back a response like status and json data
     */
    async positive(req, res) {
        const patients = await Patient.findByStatus("positive");

        if (patients) {
            const data = {
                message: "Got possitive patients data",
                data: patients,
            };

            return res.status(200).json(data);
        }
    }

    /**
     * creating patient data based on "recovered" status
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {findByStatus} method used for search patient data based on writed status
     * @returns for giving back a response like status and json data
     */
    async recovered(req, res) {
        const patients = await Patient.findByStatus("recovered");

        if (patients) {
            const data = {
                message: "Got recovered patients data",
                data: patients,
            };

            return res.status(200).json(data);
        }
    }

    /**
     * creating patient data based on "dead" status
     * @param {*} req for recieving data
     * @param {*} res for giving status response
     * @param {findByStatus} method used for search patient data based on writed status
     * @returns for giving back a response like status and json data
     */
    async dead(req, res) {
        const patients = await Patient.findByStatus("dead");

        if (patients) {
            const data = {
                message: "Got dead patients data",
                data: patients,
            };

            return res.status(200).json(data);
        }
    }
}

//create object PatientController
const object = new PatientController();

//export object as module
module.exports = object;