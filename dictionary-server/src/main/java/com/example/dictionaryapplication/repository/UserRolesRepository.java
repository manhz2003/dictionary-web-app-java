package com.example.dictionaryapplication.repository;

import com.example.dictionaryapplication.entity.Role;
import com.example.dictionaryapplication.entity.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRoles, Long> {

    @Query("SELECT ur.role FROM UserRoles ur WHERE ur.user.id = :userId")
    List<Role> findRolesByUserId(@Param("userId") Long userId);
    List<UserRoles> findByUser_Id(Long userId);

    Optional<Object> findByUserId(Long userId);
}
