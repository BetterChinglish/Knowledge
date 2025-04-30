const allPath = []

function getMaxDeep(tree) {
    if(!tree) return 0;
    recursionToDeeppestNode(tree);
}

function recursionToDeeppestNode(tree, path=[]) {
    console.log(tree);
    
    if(tree.val) {
        path.push(tree.val);
    }

    if(tree.leftSubNode) {
        recursionToDeeppestNode(tree.leftSubNode, [...path])
    } 
    if(tree.rightSubNode) {
        recursionToDeeppestNode(tree.rightSubNode, [...path])
    }

    if(!tree.leftSubNode && !tree.rightSubNode) {
        allPath.push(path);
    }
}

getMaxDeep({
    val: 1,
    leftSubNode: {
        val: 2,
        leftSubNode: {
            val: 3,
            rightSubNode: {
                val: 4
            }
        }
    }
})

console.log(allPath);
