package com.example.dictionaryapplication.service;
import com.example.dictionaryapplication.entity.Role;
import com.example.dictionaryapplication.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAllBy();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public List<Role> createRoles(List<Role> roles) {
        return roleRepository.saveAll(roles);
    }

    public Role updateRole(Long id, Role roleDetails) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        role.setNameRole(roleDetails.getNameRole());
        role.setType(roleDetails.getType());
        return roleRepository.save(role);
    }

    public void deleteAllRoles() {
        roleRepository.deleteAll();
    }

}
