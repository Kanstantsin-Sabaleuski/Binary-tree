'use strict';

class BinaryTree {

	constructor() {
		this.root = null;		
	}

	insert(data) {
		var n_Node = new Node(data);
		var path = this.root;
		
		if (this.root == null) {			
			this.root = n_Node;			
			return;			
		}

		while(true)	{
			
			if (data > path.data) {
				if (path.right == null) {
					path.right = n_Node;
					break;
				}
				else {
					path = path.right;
				}			
			}

			if (data < path.data) {
				if (path.left == null) {
					path.left = n_Node;
					break;
				}
				else {
					path = path.left;
				}				
			}			
		}
	}

	contains(data) {     // 2nd variant with recursion. 
		/*if (this.root == null) return false;
		var path = this.root;		
		return search(path, data);

		function search(path, data) {		

			if (path == null) return false;
			if (data == path.data) return true;
			if (data > path.data) return search(path.right, data);			
			if (data < path.data) return search(path.left, data);
		} */

		var path = this.root; // 1st variant. It works fine
		
		while (true) {		

			if (path == null) {
				return false;
			}

			if (data == path.data) {				
				return true;
			} 
			if (data > path.data) {
				path = path.right;
				continue;				
			}
			if (data < path.data) {				
				path = path.left;				
			}		
		} 
	}

	remove(data) {		//Works fine with ALL data variants, not only from the test
		
		var path = this.root, 
		    parent_path,
		    heir_path, heir_parent; // path to the heir and its parent		    

		 function nextSearch(data, search_path) {	 
		 	var heir_path = null; 		 	
		 	while (true) {
		 		if (search_path == null) {		 			
		 			return heir_path;
		 		}
		 		if (data == search_path.data) {		 					 			
		 			heir_parent = heir_path;
		 			heir_path = search_path;
		 			search_path = search_path.right;
		 			continue;
		 		}

		 		if (data > search_path.data) {
		 			search_path = search_path.right;		 			
		 			continue;
		 		}
		 		if (data < search_path.data) {
		 			heir_parent = heir_path;		 			
		 			heir_path = search_path;
		 			search_path = search_path.left;
		 		}		 				 		
		 	}		 			 	
		 }			 	

		while (true) {	

			if (path == null) { 	// no such data in our b-tree				
				return;
			}

			if (data == path.data) {		
				if (!path.left && !path.right) {  // no child nodes
					if (parent_path == null) { //check for data in the root
						this.root = null;
						return
					}
					if (parent_path.right == path) parent_path.right = null;
					if (parent_path.left == path) parent_path.left = null;									
					//console.log(parent_path, " parent", path, data);				
					return; 
				}
				if (!path.left || !path.right) {  // one child node					
					if (path.left == null) {  //check for data in the root
						if (parent_path == null) {
						this.root = path.right;
						return
						}
						if (parent_path.right == path) parent_path.right = path.right;
						if (parent_path.left == path) parent_path.left = path.right;
					}
					if (path.right == null)	{
						if (parent_path == null) { //check for data in the root
						this.root = path.left;
						return
						}
						if (parent_path.right == path) parent_path.right = path.left;
						if (parent_path.left == path) parent_path.left = path.left;
					}											
					//console.log(parent_path, " parent", path, data);				
					return; 
				}
				else {					
					heir_path = nextSearch(data, path);
					path.data = heir_path.data;
					if (heir_parent.left == heir_path) heir_parent.left = heir_path.right;
					else heir_parent.right = heir_path.right;
					//console.log(data, this.root);
					return;
				} 				
			}  

			if (data > path.data) {				
				parent_path = path;
				path = path.right;								
				continue;				
			}
			if (data < path.data) {				
				parent_path = path;				
				path = path.left;				 
			}		
		} 				 
	}

	size() {								// 1st variant. Not optimal one, but my own )
		var counter = 0, path = this.root;  

		if (path == null) return counter;
		counter++;

		function minNode(path) {
			if (path.left == null) {
				return path.data;
			}
			return minNode(path.left);
		}

		//console.log(minNode(path));
		//console.log(path);

		function nextSearch(data) {	 
		 	var next_path = null, search_path = path;
		 	while (search_path) {	
		 		if (data < search_path.data) {		 					 			
		 			next_path = search_path;
		 			search_path = search_path.left;
		 		}	 		
		 		else search_path = search_path.right;
		 	}
		 		//console.log(next_path.data);
		 	if (next_path) {
		 	  	counter++; 	
		 	  	//console.log(data, counter);
		 		nextSearch(next_path.data); 
		 	}
		 	else return;
		 }

		nextSearch(minNode(path));
		return counter; 

		/*var path = this.root;  // 2nd classical variant with recursion

		function count(path) {
		if (path == null) return 0;
		else return (1 + count(path.left) + count(path.right));
		}

		return count(path); */


		/*function nextSearch(data, search_path) {	 
		 	var next_path = null; 		 	
		 	while (search_path) {	
		 		if (data < search_path.data) {		 					 			
		 			next_path = search_path;
		 			search_path = search_path.left;
		 		}	 		
		 		else search_path = search_path.right;
		 	}
		 		//console.log(next_path.data);
		 		counter++;		 		
		 		return next_path; 

		 }	

		 //console.log(nextSearch(20, this.root));
		var min = minNode(path);

		while (nextSearch(min, this.root)) {
		 	counter++
		 	min = nextSearch(min, this.root).data;
		 	}
		return counter; */
	} 

	isEmpty() {
		//console.log(this.root, "test empty");
		return this.root == null;
	}
}





/* 		/* if (data == 9) return;
		if (data == 15 ) {
			console.log(this.root.right.left);
			console.log(this.root.right.left.data);
			this.root.right.left = null;
			return;
		}
		if (data == 8) {
			this.root.left.left = this.root.left.left.left;
			return;
		} */

		//console.log(data, this.contains(data));
		
		/* var path = this.root;			

		//console.log(path, old_path);

		while (true) {		

			if (path == null) {
				console.log(data, false);
				return;
			}

			/*if (data == path.data) {
				//console.log(data, path, old_path);
				if (old_path_right.right == path) old_path_right.right = null;
				if (old_path_left.left == path) old_path_left.left = null;
				
				console.log(data, path);
				return; *
			} */ 
			/*if (data > path.data) {
				if (path.right != null) {
					if (data == path.right.data) {
						if (path.right.left != null) { 
							path.right = path.right.left;
						}
						else path.right = path.right.right;
						console.log(data, true);						
						return;
					}
				}
				var old_path = path;
				path = path.right;								
				continue;				
			}
			if (data < path.data) {
				if (path.left != null) {
					if (data == path.left.data) {	
									console.log(old_path, path, "test");	
						if (path.left.left != null ) { 							
							path.left = path.left.left;							
						}						
						else path.left = path.left.right;
						console.log(data, true);						
						return;
					}
				}
				var old_path = path;				
				path = path.left;				 
			}		
		} 
	} */


