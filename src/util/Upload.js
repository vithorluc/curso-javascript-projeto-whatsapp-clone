import { Firebase } from "./Firebase"

export class Upload {

    static send(file, from) {

        return new Promise((s , f) => {

            let uploadTaskRef = Firebase.hd().ref(from).child(Date.now() + '_' +file.name)
                
            uploadTaskRef.put(file).on('state_changed', e => {
                
                console.info('upload: ', e)
                
                },err => {
                    
                    f(err)
                
                }, () => {

                    s(uploadTaskRef)

                }
            )
        })  
    }


}