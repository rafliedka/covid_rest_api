//import patient model
const Patient = require("../models/Patient.js");

//create PatientController class
class PatientController{
    //index method
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

    //store method
    async store(req, res) {
 
        const patients = await Patient.create(req.body);
    
        const data = {
          message: "Resource is added successfully",
          data: patients,
        };
    
        return res.status(201).json(data);
    }

    //show method
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

    //update method
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

    //destroy method
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

    //search method by name
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