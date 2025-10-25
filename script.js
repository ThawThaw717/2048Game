const gridItems = document.querySelectorAll(".grid-item");
        let row = [];
        const matrix = [];

        for(let i=0; i<gridItems.length; i++){
            gridItems[i].firstElementChild.textContent="";
            row.push(gridItems[i]);
            if((i+1)%4 === 0){
                matrix.push(row);
                row = [];
            }
        }

        let score=0;
        const scoreBoard= document.querySelector(".scoreBoard");


        /*
        const r1= Math.floor(Math.random()*4);
        const c1= Math.floor(Math.random()*4);
        let r2= Math.floor(Math.random()*4);
        let c2= Math.floor(Math.random()*4);

        while(r1===r2 && c1===c2){
            r2= Math.floor(Math.random()*4);
            c2= Math.floor(Math.random()*4);
        }

        matrix[r1][c1].firstElementChild.textContent=2;
        matrix[r2][c2].firstElementChild.textContent=2;
        */

        addRandomTile();
        addRandomTile();

        let touchStartX=0,touchEndX=0, touchStartY=0, touchEndY=0;
        
        document.addEventListener("touchstart" ,(e)=>{
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            
        })

        document.addEventListener("touchend" ,(e)=>{
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const diffX= touchEndX-touchStartX;
            const diffY= touchEndY-touchStartY;

            if(Math.abs(diffX)>Math.abs(diffY)){
                diffX<0? moveBlocks({key:"ArrowLeft"}): moveBlocks({key: "ArrowRight"});
            }else{
                diffY<0? moveBlocks({key:"ArrowUp"}): moveBlocks({key: "ArrowDown"});
            }
        })

        function moveLeft(row){
            for(let i=0; i<3; i++){
                for(let j=1;j<4; j++){
                    let curr = row[j].firstElementChild;
                    let prev = row[j-1].firstElementChild;
                    if(prev.textContent===""){
                        prev.textContent=curr.textContent;
                        curr.textContent="";
                    }
                }
            }
        }

        function mergeLeft(row){
            moveLeft(row);
            for(let j=1;j<4;j++){
                let curr= row[j].firstElementChild;
                let prev= row[j-1].firstElementChild;
                if(curr.textContent=== prev.textContent && curr.textContent!==""){
                    prev.textContent= parseInt(prev.textContent)*2;
                    curr.textContent="";
                    score += parseInt(prev.textContent);
                    scoreBoard.textContent = score;
                }
            }
            moveLeft(row);
        }

        function moveRight(row){
            for(let i=0; i<3; i++){
                for(let j=2; j>=0 ;j--){
                    let curr = row[j].firstElementChild;
                    let next = row[j+1].firstElementChild;
                    if(next.textContent ===""){
                        next.textContent = curr.textContent;
                        curr.textContent = "";
                    }
                }
            }

        }

        function mergeRight(row){
            moveRight(row);
            for(let j=2; j>=0; j--){
                let curr = row[j].firstElementChild;
                let next =row[j+1].firstElementChild;
                if(curr.textContent === next.textContent && curr.textContent!=""){
                    next.textContent=parseInt(next.textContent)*2;
                    curr.textContent = "";
                    score+=parseInt(next.textContent);
                    scoreBoard.textContent=score;
                }
            }
            moveRight(row);
        }

        function moveUp(){
            for(let c=0;c<4; c++){
                let col = [matrix[0][c],matrix[1][c],matrix[2][c], matrix[3][c]];
                mergeLeft(col);
            }
        }

        function moveDown(){
            for(let c=0;c<4; c++){
                let col = [matrix[0][c],matrix[1][c],matrix[2][c], matrix[3][c]];
                mergeRight(col);
            }
        } 

        function moveBlocks(e){
            if(e.key==="ArrowLeft") matrix.forEach(mergeLeft);
            if(e.key==="ArrowRight") matrix.forEach(mergeRight);
            if(e.key==="ArrowUp")moveUp();
            if(e.key==="ArrowDown")moveDown();
            addRandomTile();
        }
        
        function getMatrixContent(){
            return matrix.map(row=>row.map(cell=>cell.firstElementChild.textContent))
        };
        
        function addRandomTile(){
            let emptyCells = [];
            for(let i=0;i<matrix.length; i++){
                for(let j=0;j<matrix.length; j++){
                    if(matrix[i][j].firstElementChild.textContent===""){
                        emptyCells.push([i,j])
                    }
                }
            }

            if(emptyCells.length === 0)return;

            let [i,j] = emptyCells[Math.floor(Math.random()*emptyCells.length)];
            matrix[i][j].firstElementChild.textContent = Math.random()<0.9? 2:4;
        }
        document.addEventListener("keydown",moveBlocks);