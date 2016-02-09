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

	contains(data) { 			// 1st variant. It works fine

		var path = this.root; 
		
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
								// 2nd variant with recursion.
		/*if (this.root == null) return false; 	 
		var path = this.root;		
		return search(path, data);

		function search(path, data) {
			if (path == null) return false;
			if (data == path.data) return true;
			if (data > path.data) return search(path.right, data);			
			if (data < path.data) return search(path.left, data);
		} */
	}

	remove(data) {		// Works fine with ALL node data values, not only from the test. 
						// In a case of 2 child in removing node, function searches for the next node 
						// and correctly replace it.
		
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
				if (!path.left && !path.right) {  // no children
					if (parent_path == null) { //check for data in the root
						this.root = null;
						return;
					}
					if (parent_path.right == path) parent_path.right = null;
					if (parent_path.left == path) parent_path.left = null;																
					return; 
				}
				if (!path.left || !path.right) {  // one child node					
					if (path.left == null) {  //check for data in the root
						if (parent_path == null) {
						this.root = path.right;
						return;
						}
						if (parent_path.right == path) parent_path.right = path.right;
						if (parent_path.left == path) parent_path.left = path.right;
					}
					if (path.right == null)	{
						if (parent_path == null) { //check for data in the root
						this.root = path.left;
						return;
						}
						if (parent_path.right == path) parent_path.right = path.left;
						if (parent_path.left == path) parent_path.left = path.left;
					}																				
					return; 
				}
				else {		// 2 child nodes			
					heir_path = nextSearch(data, path);
					path.data = heir_path.data;
					if (heir_parent.left == heir_path) heir_parent.left = heir_path.right;
					else heir_parent.right = heir_path.right;					
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

	size() { 				// Classical variant with recursion
		var path = this.root;  

		function count(path) {
		if (path == null) return 0;
		else return (1 + count(path.left) + count(path.right));
		}

		return count(path); 


					// Another variant, counts nodes in order from minimum to maximum 
		/* var counter = 0, path = this.root;  

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
		return counter; */		
	} 

	isEmpty() {		
		return this.root == null;
	}
}