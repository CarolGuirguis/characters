var model={
    currentcharacter: null,
    characters:[
        {
            clickCount:0,
            name:"Spiderman",
            id:"0",
            img:'./images/download.jfif'
        },
        {
            clickCount:0,
            name:"Ironman",
            id:"1",
            img:'./images/ironman.jpg'
        }
    ],
    addcharacter:function(cname,ccount,csrc){
        
            const character = {
              clickCount: ccount,
              name: cname,
              id: this.characters.length > 0 ? parseInt(this.characters[this.characters.length - 1].id) + 1 : 0,
              img:csrc
            }
        
            this.characters.push(character)
         
    }
}

var octopus={
   
    init: function(){
    model.currentcharacter=0;
    list.render();
    list.buttonsrender();
    characterview.render();
    },
    setcurrent:function(id){
        model.currentcharacter=id;
        characterview.changecurrent();
    },
    incrementcount:function(){
        
        var count=model.characters[model.currentcharacter].clickCount;
        count=parseInt(count)+1;
        model.characters[model.currentcharacter].clickCount=count;
        
        characterview.changecount();
    },
    getcurrentCharacter:function(){
        return model.currentcharacter;
    },
    getcharacters:function(){
        return model.characters;
    },
    showform:function(){
        formview.render();
    },
    hideform:function(){
        formview.hide();
    },
    submitform:function(){
        formview.submit();
        formview.hide();
    },
    addcharacter:function(name,count,src){
       model.addcharacter(name,count,src);
       list.render();
    }
}
var list={
    render: function(){
        var characters=octopus.getcharacters();
        var ul = document.getElementById("list");
        ul.innerHTML = "";
        for( let i=0;i<characters.length;i++){
           
            var li = document.createElement("li");
            var newImage = document.createElement('img')
            newImage.setAttribute('class', 'image-item')
            newImage.setAttribute('id', characters[i].id)
            console.log(characters[i].img)
            newImage.src = characters[i].img;
        
            li.appendChild(newImage);
            li.classList.add('liitem');
            
            newImage.addEventListener('click', function (e) {
                octopus.setcurrent(e.target.id);
              });
            ul.appendChild(li);
           
        }
      
       
    },
    buttonsrender:function(){
        document.getElementById("addbutton").addEventListener('click', function () {
            octopus.showform();
          });
          document.getElementById("cancelbutton").addEventListener('click', function () {
            octopus.hideform();
          });
          document.getElementById("submitbutton").addEventListener('click', function () {
            octopus.submitform();
          });
    }
}
var characterview={
    render: function(){
        var characters=octopus.getcharacters();
        var current=octopus.getcurrentCharacter();
        document.getElementById("currentimage").src=characters[current].img;
        document.getElementById("currentname").innerHTML=characters[current].name;
        document.getElementById("currentcount").innerHTML=characters[current].clickCount;
        this.currentimage= document.getElementById("currentimage");
        this.currentimage.addEventListener('click', function () {
            octopus.incrementcount();
          });
          
    },
    changecount: function(){
        var characters=octopus.getcharacters();
        var current=octopus.getcurrentCharacter();
        document.getElementById("currentcount").innerHTML=characters[current].clickCount;
    },
    changecurrent:function(){
        var characters=octopus.getcharacters();
        var current=octopus.getcurrentCharacter();
        document.getElementById("currentimage").src=characters[current].img;
        document.getElementById("currentname").innerHTML=characters[current].name;
        document.getElementById("currentcount").innerHTML=characters[current].clickCount;
    }
}
var formview={
    render:function(){
        document.getElementById("form").classList.remove('hide');
        document.getElementById("form").classList.add('show');

    },
    hide:function(){
        document.getElementById("form").classList.remove('show');
        document.getElementById("form").classList.add('hide');
        document.getElementById("addedname").value="";
        document.getElementById("addedcount").value="";
        document.getElementById("addedurl").value="";
    },
    submit:function(){
       var name=document.getElementById("addedname").value;
       var clickcount=document.getElementById("addedcount").value;
       var src=document.getElementById("addedurl").value;
       document.getElementById("addedname").value="";
       document.getElementById("addedcount").value="";
       document.getElementById("addedurl").value="";
       octopus.addcharacter(name,clickcount,src);
    }
}
octopus.init();
