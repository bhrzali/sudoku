function num_check(m,n,r,c){
	for (i=0;i<9;i++){
		if (i!=c){
			if (m[r][i]==n){
				return false;
			}
		}
	}
			
	for (i=0;i<9;i++){
		if(i!=r){
			if(m[i][c]==n){
				return false;
			}
		}
	}
			
	var i=3;
	var X;
	while(i<=9){
		if(r<i){
			X=Math.floor(i/3)-1;
			break;
		}
		i=i+3;
	}
			
	var i=3;
	var Y;
	while(i<=9){
		if(c<i){
			Y=Math.floor(i/3)-1;
			break;
		}
		i=i+3;
	}
	X=X*3;
	Y=Y*3;
			
	for (i=X;i<X+3;i++){
		for (j=Y;j<Y+3;j++){
			if (i!=r || j!=c){
				if(m[i][j]==n){
					return false;
				}
			}
		}
	}
return true;
}
		
function next_empty_block(m,r,c){
	if(m[r][c]==0){
		return [r,c];
	}
	while(true){
		c=c+1;
		if(c>=m[0].length){
			c=0;
			r=r+1;
		}
		if(r>=m.length){
			return false;
		}
		if(m[r][c]==0){
			break;
		}
	}
	return [r,c];
}
var t;
function sudoku(m,r,c){
	if(!next_empty_block(m,r,c)){
		t=m;
		return true;
	}
	var inputs = next_empty_block(m,r,c);
	r=inputs[0];
	c=inputs[1];
	for(var n=1;n<10;n++){
		if(num_check(m,n,r,c)){
			m[r][c]=n;
			if(sudoku(m,r,c)){
				return true;
			}
			m[r][c]=0;
		}
	}
	return false;
}
//creating table and implementation
$(document).ready(function(){
	//creating 9*9 matrix table
	for(var i=0;i<9;i++){
		$('#matrix').append('<tr></tr>');
		for(var j=0;j<9;j++){
			$('#matrix tr:last').append('<td><input type="text" style="font-size:25px" pattern="[0-9]{1}" maxlength="1"  size="1"></input></td>');
		}
	}
	$('#solve').click(function(){
		//reading values from the matrix table
		var a = [];
		for(var i=0;i<9;i++){
			a.push([]);
			for(var j=0;j<9;j++){
				var v = $('#matrix tr:eq('+i+') td:eq('+j+') input').val();
				if(v==""){
					a[i].push(0);
				}
				else{
					a[i].push(v);
				}
			}
		}
		//solution
		sudoku(a,0,0);
		//printing solution
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
				$('#matrix tr:eq('+i+') td:eq('+j+') input').val(t[i][j]);
			}
		}
	});
});
