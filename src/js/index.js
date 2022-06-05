// import svetofor from "./time"

class initial {
    constructor() {
        this.container = document.querySelector('.container')
        this.colorPalette = document.querySelector('.colorPalette')
        this.addLinz = document.querySelector('#add')
        this.start = document.querySelector('#start')
        this.stop = document.querySelector('#stop')
        this.linzAll = document.querySelectorAll('.linz')
        this.count = 0
        this.linzCount = 0
        this.checkLinzInLocalStorage()
        this.stopTraffic()
        this.start.addEventListener('click', () => {
            this.checkLocalStorag()
        })
    }
  
// при нажатии  кнопки добавить добавляется линза
    addNewLinz() {
        this.addLinz.addEventListener('click', () => {
            this.createLinz()
        })
    }

      // метод создания пустой линзы
      createLinz(){
        let linz = document.createElement('div')
        linz.className = 'linz'
        linz.style.backgroundColor = ''
        this.container.append(linz)
        let input = document.createElement('input')
        input.className = 'input'
        // input.value = 2
        input.style.marginLeft = '150%'
        this.container.append(input)
        this.linz = document.querySelector('.linz')
        linz.addEventListener('click', (e) => {
            e.target.style.backgroundColor = this.colorPalette.value
            this.linzColorArrPush()
        })
    }

    // добаляем в массив заданные линзам цвета и тайминги
    linzColorArrPush() {
        let arr = []
        let linz = document.querySelectorAll('.linz')
            let input = document.querySelectorAll('.input')
                for (let i = 0; i < linz.length; i++) {
                    arr.push({
                        color: linz[i].style.backgroundColor,
                        timeFromInput: input[i].value * 1000
                    })

                }
                
                localStorage.setItem('arr', JSON.stringify(arr))
        
        
               

    }
    // при нажатии  кнопки старт запускаем интервал с перемигиванием светофора

    checkLocalStorag() {
            let arr = JSON.parse(localStorage.getItem('arr'));
            let linzAll = document.querySelectorAll('.linz')
            let timer = Number(arr[this.count].timeFromInput)
            linzAll[this.count].style.backgroundColor = arr[this.count].color; 
                        let date  = Number(new Date()) 
                       let flag  = true
                        linzAll[this.count].addEventListener('mouseenter', (e)=>{
                            console.log(e.target.mouseenter)
                            if (flag ==true) {
                                // e.stopPropagation()
                                console.log('mouseenter')
                                let newValueDate  = date - Number(new Date())
                                arr[this.count].timeFromInput = arr[this.count].timeFromInput +newValueDate
                                localStorage.removeItem('arr')
                                localStorage.removeItem('this.count')
                                localStorage.setItem('this.count', JSON.stringify(this.count))
                                localStorage.setItem('arr', JSON.stringify(arr))
                                flag = false
                                clearInterval(interval)    
                                
                            }
                                            
                            
                        })
                        linzAll[this.count].addEventListener('mouseleave', (e)=>{
                            
                            if (flag == false){
                                // e.stopPropagation()
                                console.log('mouseleave')
                                flag = true
                                  this.start.click()
                                 
                                
                            }
                        })
                          
                        let interval = setInterval(()=>{

                            
                            if (this.count>=arr.length) clearInterval(interval)
                            let newValueDate  = date - Number(new Date()) 
                           

                            if(timer + newValueDate <= 0) {
                                linzAll[this.count].style.backgroundColor = ''
                                this.count++
                                clearInterval(interval)
                                this.checkArrInlocalLength(this.count, arr)
                            }


                            window.onbeforeunload = (()=>{
                                arr[this.count].timeFromInput = arr[this.count].timeFromInput +newValueDate
                                localStorage.removeItem('arr')
                                localStorage.removeItem('this.count')
                                localStorage.setItem('this.count', JSON.stringify(this.count))
                                localStorage.setItem('arr', JSON.stringify(arr))
                                this.checkArrInlocalLength(this.count)
                        
                            })

                          
                        
                           
                        },0)


           
    }
   
 
 
    

    checkArrInlocalLength(count, arr) {
        this.count = count
        if (count < arr.length) {
          this.checkLocalStorag()
        } else {
          this.count = 0
          this.checkLocalStorag() 
        }
    }
    //проверяем есть ли линзы и их свойтсва в локал стораж
    checkLinzInLocalStorage(){
        if(localStorage.getItem('arr')){
            let arr = JSON.parse(localStorage.getItem('arr'))
            this.count = JSON.parse(localStorage.getItem('this.count'))
            this.count = Number(this.count)
            arr.forEach(()=>this.createLinz())
        }
    }
    stopTraffic(){
        this.stop.addEventListener('click', ()=>{
            localStorage.removeItem('arr')
            localStorage.removeItem('this.count')
            location.reload()
        })
        
    }
    


}

const initialClass = new initial()
initialClass.addNewLinz()
